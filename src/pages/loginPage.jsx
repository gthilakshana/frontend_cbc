import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function login() {
        axios.post(import.meta.env.VITE_BACKEND_URL + '/api/users/login', {
            email: email,
            password: password
        }).then((Response) => {

            if (Response.data.user == null) {
                toast.error(Response.data.message)
                return
            } else {
                toast.success(Response.data.message)
            }

            localStorage.setItem('token', Response.data.token)

            if (Response.data.user.type == "admin") {
                window.location.href = "/admin"
            } else {
                window.location.href = "/home"
            }


        })
    }

    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center bg-gray-100">

            {/* Left Image Section */}
            <div className="hidden md:flex w-1/2 h-full items-center justify-center  p-6">
                <img
                    src="/clothing.png"
                    alt="Clothing Shop"
                    className="w-full max-w-md "
                />
            </div>

            {/* Right Login Section */}
            <div className="w-full md:w-1/2 max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-10 mx-4 my-10">
                <div className="flex flex-col items-center space-y-4">



                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-700">Welcome Back</h2>
                    <p className="text-sm text-gray-500">Login to continue shopping your favorite styles</p>

                    {/* Email Field */}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    {/* Password Field */}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    {/* Login Button */}
                    <button
                        onClick={login}
                        className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md transition-all duration-300"
                    >
                        Login
                    </button>

                    {/* Sign Up Button */}
                    <button
                        onClick={() => window.location.href = "/register"}
                        className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-blue-600 font-semibold rounded-xl transition"
                    >
                        Create New Account
                    </button>

                    {/* Forgot Password */}
                    <div className="w-full text-center mt-2">
                        <p className="text-sm text-gray-500">
                            Forgot password?{' '}
                            <a href="/reset" className="text-blue-500 hover:underline">Reset here</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>



    );

}
