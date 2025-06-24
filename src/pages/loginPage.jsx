import axios from 'axios';
import { useState } from 'react';
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
                alert(Response.data.message)
                return
            }
            localStorage.setItem('token', Response.data.token)

            if (Response.data.token) {
                window.location.href = '/admin'
            } else {
                window.location.href = '/'
            }


        })
    }

    return (
        <div className='w-full h-screen bg-red-600 flex justify-center items-center'>
            <div className='w-[450px] h-[450px] border border-black bg-white justify-center items-center flex flex-col'>
                <img src='/logo.jpg' className='rounded-full w-[100px]' alt='logo mb-5 ' />
                <input type='email' defaultValue={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='w-[300px] h-[40px] border border-black rounded-md px-5 mt-12' />
                <input type='password' defaultValue={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='w-[300px] h-[40px] border border-black rounded-md px-5 mt-3' />
                <button onClick={login} className='w-[300px] h-[40px] border border-black rounded-md px-5 bg-red-600 mt-10'>Login</button>
            </div>
        </div>
    );
}
