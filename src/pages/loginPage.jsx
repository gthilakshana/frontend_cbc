import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function login(e) {
        e.preventDefault();

        try {
            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + '/api/users/login',
                { email, password }
            );

            const { user, token, message } = response.data;

            if (!user) {
                toast.error("Invalid login credentials.");
                return;
            }

            toast.success(message);
            localStorage.setItem("token", token);

            navigate(user.type === "admin" ? "/admin" : "/home");

        } catch (error) {
            const status = error?.response?.status;
            const errorMsg = error?.response?.data?.message || "Login failed.";

            if (status === 403) {
                toast.error("Your account has been blocked.");
            } else if (status === 401 || status === 404) {
                toast.error(errorMsg);
            } else {
                toast.error("Something went wrong.");
            }
        }
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 mb-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    <span className="mx-1">&gt;</span>
                    <span className="text-gray-700"> Login</span>
                </div>

                {/* Form Box */}
                <div className="bg-white border border-gray-200 p-8 rounded-md shadow-sm">
                    <h2 className="text-center text-2xl font-bold text-gray-800 mb-1">LOGIN</h2>
                    <p className="text-center text-sm text-gray-600 mb-6">
                        Please login to continue shopping
                    </p>

                    <form onSubmit={login} className="space-y-5">
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Email Address"
                                required
                                className="w-full px-4 py-3 rounded-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="w-full px-4 py-3 rounded-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 mt-2"
                        >
                            LOGIN
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-500">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-blue-500 hover:underline">
                                Create one
                            </Link>
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
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
