import { Link } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login Page</h1>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button>Login</button>
                <Link className='link' to="/home">Home Page</Link>
            </div>

        </div>
    );
}
