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
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200">
            <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl flex flex-col items-center space-y-4 transition duration-300 ease-in-out">

                {/* Logo */}
                <img
                    src="/logo.jpg"
                    alt="Logo"
                    className="w-24 h-24 rounded-full mb-4 border-2 border-blue-300 shadow-md hover:scale-105 transition-transform duration-300"
                />

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-700 mb-2 tracking-wide">Welcome Back</h2>
                <p className="text-sm text-gray-500 mb-4">Login to continue shopping</p>

                {/* Email */}
                <input
                    type="email"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 placeholder-gray-400 transition"
                />

                {/* Password */}
                <input
                    type="password"
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 placeholder-gray-400 transition"
                />

                {/* Login Button */}
                <button
                    onClick={login}
                    className="w-full py-3 mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                    Login
                </button>

                {/* Optional: Forgot password & signup links */}
                <div className="w-full text-center mt-4">
                    <p className="text-sm text-gray-500">
                        Forgot password?{' '}
                        <a href="/reset" className="text-blue-500 hover:underline">
                            Reset here
                        </a>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        New here?{' '}
                        <a href="/register" className="text-blue-500 hover:underline">
                            Create an account
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );

}
