import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './authService';
import AuthLayout from '../layouts/AuthLayout';
import '../assets/styles/Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username && password) {
            login('fake_token');
            navigate('/dashboard');
        }
    };

    return (
        <AuthLayout>
            <div className="login-wrapper">
                <div className="login-card shadow-lg">
                    <h3 className="text-center mb-4">Welcome Back</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control login-input"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control login-input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-block login-btn">
                            Login
                        </button>

                        <p className="login-info-text text-center mt-3">
                            You can enter any random value for the input.
                        </p>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Login;