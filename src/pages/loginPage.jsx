import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function login() {
        axios.post(import.meta.env.VITE_BACKEND_URL + '/api/users/login', {
            email,
            password
        }).then((response) => {
            if (!response.data.user) {
                toast.error(response.data.message);
                return;
            }
            toast.success(response.data.message);
            localStorage.setItem('token', response.data.token);

            window.location.href = response.data.user.type === "admin" ? "/admin" : "/home";
        });
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-blue-100 px-4">
            <div className="flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full">

                {/* Image Section */}
                <div className="hidden md:flex w-full md:w-1/2 bg-cover bg-center p-6">
                    <img
                        src="/clothing.png"
                        alt="Fashion"
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/2 p-8 sm:p-12">
                    <h2 className="text-3xl font-bold text-gray-800 text-center">Welcome Back 👋</h2>
                    <p className="text-sm text-gray-500 text-center mb-6">
                        Login to continue shopping your favorite styles
                    </p>

                    <div className="space-y-4">
                        {/* Email */}
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        {/* Password */}
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        {/* Login */}
                        <button
                            onClick={login}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition"
                        >
                            Login
                        </button>

                        {/* Register */}
                        <button
                            onClick={() => window.location.href = "/register"}
                            className="w-full py-3 bg-white border border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold rounded-xl transition"
                        >
                            Create New Account
                        </button>
                    </div>

                    {/* Forgot Password */}
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-500">
                            Forgot password?{' '}
                            <Link to="/reset" className="text-blue-500 hover:underline">
                                Reset here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
