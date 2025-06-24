import { Link } from 'react-router-dom';

export default function LoginPage() {
    return (
        <div className='w-full h-screen bg-red-600 flex justify-center items-center'>
            <div className='w-[450px] h-[450px] border border-black bg-white justify-center items-center flex flex-col'>
                <img src='/logo.jpg' className='rounded-full w-[100px]' alt='logo mb-5 ' />
                <input type='email' placeholder='Email' className='w-[300px] h-[50px] border border-black rounded-full px-5 mt-12' />
                <input type='password' placeholder='Password' className='w-[300px] h-[50px] border border-black rounded-full px-5 mt-3' />
                <Link to='/admin/home'><button className='w-[300px] h-[40px] border border-black rounded-md px-5 bg-red-600 mt-3'>Login</button></Link>
            </div>
        </div>
    );
}
