import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login(e) {
        e.preventDefault();

        try {
            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + '/api/users/login',
                { email, password }
            );

            const { user, token, message } = response.data;

            // 🟨 Safety check (shouldn't happen if backend returns properly)
            if (!user) {
                toast.error("Invalid login");
                return;
            }

            toast.success(message);
            localStorage.setItem("token", token);
            window.location.href = user.type === "admin" ? "/admin" : "/home";

        } catch (error) {
            const status = error?.response?.status;
            const errorMsg = error?.response?.data?.message || "Login failed";

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
            <div className="w-full max-w-md border border-gray-200 p-8 rounded-md shadow-sm">
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-1 uppercase">Welcome Back</h2>
                <p className="text-center text-sm text-gray-600 mb-6">
                    Login to continue shopping your favorite styles
                </p>

                <form onSubmit={login} className="space-y-5">
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                        className="w-full px-4 py-3 rounded-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="w-full px-4 py-3 rounded-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-sm transition"
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        onClick={() => window.location.href = "/signup"}
                        className="w-full py-3 bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold rounded-sm transition"
                    >
                        Create New Account
                    </button>
                </form>

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
    );
}
