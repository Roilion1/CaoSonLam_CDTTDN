import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrashAlt } from 'react-icons/fa';
import UserService from '../../../services/UserService'; // Đảm bảo bạn đã import UserService
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const result = await UserService.index();
            setUsers(result.users);
        })();
    }, []);

    // Hàm xử lý xóa người dùng
    const deleteUser = async (id) => {
        try {
            await UserService.delete(id);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Hàm xử lý thay đổi trạng thái người dùng
    const statusUser = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/user/status/${id}`);
            setUsers(users.map(user => {
                if (user.id === id) {
                    user.status = (user.status === 1) ? 0 : 1; // Đảo ngược trạng thái
                }
                return user;
            }));
        } catch (error) {
            console.error('Error changing user status:', error);
        }
    };

    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-3xl uppercase text-green-800'>QUẢN LÝ NGƯỜI DÙNG</h1>
                </div>
                <div className='basis-1/2 text-right'>
                    <Link to="/admin/user/create" className="text-sm ml-2">Create</Link>
                    <Link to="/admin/user/trash" className="text-sm ml-2">Trash</Link>
                </div>
            </div>
            <div className='bg-white p-3 border rounded-lg'>
                <table className='table-auto w-full text-center border-collapse'>
                    <thead>
                        <tr className='border-b'>
                            <th className='border px-4 py-2 w-9'>#</th>
                            <th className='border px-4 py-2 w-20'>Avatar</th>
                            <th className='border px-4 py-2 w-40'>Tên</th>
                            <th className='border px-4 py-2 w-40'>Email</th>
                            <th className='border px-4 py-2 w-40'>Điện thoại</th>
                            <th className='border px-4 py-2 w-56'>Trạng thái</th>
                            <th className='border px-4 py-2 w-9'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y'>
                        {users && users.length > 0 && users.map((user, index) => {
                            const jsxStatus = user.status === 1 ? (
                                <button onClick={() => statusUser(user.id)} className='bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                    <FaToggleOn className='text-sm' />
                                </button>
                            ) : (
                                <button onClick={() => statusUser(user.id)} className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                    <FaToggleOff className='text-sm' />
                                </button>
                            );

                            return (
                                <tr key={index} className='border-b'>
                                    <td className='border px-4 py-2 text-center'>
                                        <input type='checkbox' />
                                    </td>
                                    <td className='border px-4 py-2'>
                                        <div className='flex justify-center items-center'>
                                            <img src={`http://localhost:8000/images/userImages/${user.thumbnail}`} alt={user.name} className='w-24 h-24 object-cover' />
                                        </div>
                                    </td>
                                    <td className='border px-4 py-2'>{user.name}</td>
                                    <td className='border px-4 py-2'>{user.email}</td>
                                    <td className='border px-4 py-2'>{user.phone}</td>
                                    <td className='border px-4 py-2 text-center'>
                                        {jsxStatus}
                                        <button 
                                            className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            onClick={() => navigate(`/admin/user/update/${user.id}`)} 
                                        >
                                            <FaEdit className='text-sm' />
                                        </button>
                                        <button 
                                            className='bg-gray-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            onClick={() => navigate(`/admin/user/show/${user.id}`)} // Sử dụng navigate
                                        >
                                            <FaEye className='text-sm' />
                                        </button>
                                        <button 
                                            className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            onClick={() => deleteUser(user.id)}
                                        >
                                            <FaTrashAlt className='text-sm' />
                                        </button>
                                    </td>
                                    <td className='border px-4 py-2 text-center'>{user.id}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
