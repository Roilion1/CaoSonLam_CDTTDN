import React, { useState } from 'react';
import AuthService from '../../../services/AuthService';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault(); 
        try {
            const response = await AuthService.login(form.email, form.password);
            console.log('Login successful:', response);
            navigate('/'); 
        } catch (error) {
            console.error('Error during login:', error);
            setMessage('Đăng nhập không thành công. Vui lòng kiểm tra lại.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Đăng Nhập</h2>
                <form className="flex flex-col" onSubmit={handleLogin}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="mb-4 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="mb-4 p-2 border border-gray-300 rounded"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                    >
                        Đăng Nhập
                    </button>
                </form>
                {message && <p className="text-red-500 text-center mt-4">{message}</p>}
                <div className="mt-4 flex justify-center">
                    <a href="#st" className="block">
                        <img 
                            src={require("../../../images/hinhlogo.jpg")} 
                            alt="Logo" 
                            className="w-50 h-auto" 
                        />
                    </a>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-gray-700">Chưa có tài khoản? 
                        <Link to="/register" className="text-blue-500 hover:underline"> Đăng ký ngay!</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
