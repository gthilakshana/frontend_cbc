import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function SignupPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function signup(e) {
        e.preventDefault();

        try {
            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + '/api/users/signup',
                { firstName, lastName, email, password }
            );

            const { message, token, user } = response.data;

            if (!user) {
                toast.error(message || "Signup failed.", {
                    style: { background: 'white', color: 'black' }
                });
                return;
            }

            toast.success(message, {
                style: { background: 'white', color: 'green' }
            });

            localStorage.setItem('token', token);


            navigate('/home');

        } catch (error) {
            const errorMsg = error?.response?.data?.message || "Signup failed";
            toast.error(errorMsg, {
                style: { background: '#ef4444', color: 'white' }
            });
        }
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 mb-4">
                    <Link to="/" className="hover:underline">Home</Link> &gt;
                    <Link to="/login" className="hover:underline mx-1">Login</Link>
                    <span className="mx-1">&gt;</span> Create Account
                </div>

                {/* Form Box */}
                <div className="bg-white border border-gray-200 p-8 rounded-md shadow-sm">
                    <h2 className="text-center text-2xl font-bold text-gray-800 mb-1">CREATE ACCOUNT</h2>
                    <p className="text-center text-sm text-gray-600 mb-6">
                        Please register below to create an account
                    </p>

                    <form onSubmit={signup} className="space-y-5">
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 mt-2"
                        >
                            CREATE AN ACCOUNT
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
