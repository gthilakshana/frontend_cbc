import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function login() {
        axios.post('http://localhost:5000/api/users/login', {
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
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg flex flex-col items-center">
                <img src="/logo.jpg" alt="Logo" className="w-24 h-24 rounded-full mb-6 shadow-md" />

                <input
                    type="email"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                />

                <input
                    type="password"
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
                />

                <button
                    onClick={login}
                    className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200"
                >
                    Login
                </button>
            </div>
        </div>
    );

}
