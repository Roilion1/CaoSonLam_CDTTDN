import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrashAlt } from 'react-icons/fa';
import MenuService from '../../../services/MenuService';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MenuList = () => {
    const [menus, setMenus] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const result = await MenuService.index(); // Gọi service để lấy dữ liệu menu
            setMenus(result.menus);
        })();
    }, []);

    // Hàm xử lý xóa menu
    const deleteMenu = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/menu/delete/${id}`);
            setMenus(menus.filter(menu => menu.id !== id));
        } catch (error) {
            console.error('Error deleting menu:', error);
        }
    };

    const statusMenu = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/menu/status/${id}`);
            setMenus(menus.map(menu => {
                if (menu.id === id) {
                    menu.status = (menu.status === 1) ? 0 : 1;
                }
                return menu;
            }));
        } catch (error) {
            console.error('Error changing menu status:', error);
        }
    };

    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-3xl uppercase text-green-800'>QUẢN LÝ MENU</h1>
                </div>
                <div className='basis-1/2 text-right'>
                    <Link to="/admin/menu/create" className="text-sm ml-2">create</Link>
                    <Link to="/admin/menu/trash" className="text-sm ml-2">Trash</Link>
                </div>
            </div>
            <div className='bg-white p-3 border rounded-lg'>
                <table className='table-auto w-full text-center border-collapse'>
                    <thead>
                        <tr className='border-b'>
                            <th className='border px-4 py-2 w-9'>#</th>
                            <th className='border px-4 py-2 w-40'>Tên menu</th>
                            <th className='border px-4 py-2 w-40'>Link</th>
                            <th className='border px-4 py-2 w-40'>Loại</th>
                            <th className='border px-4 py-2 w-56'>Chức năng</th>
                            <th className='border px-4 py-2 w-9'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y'>
                        {menus && menus.length > 0 && menus.map((menu, index) => {
                            const jsxStatus = menu.status === 1 ? (
                                <button onClick={() => statusMenu(menu.id)} className='bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                    <FaToggleOn className='text-sm' />
                                </button>
                            ) : (
                                <button onClick={() => statusMenu(menu.id)} className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                    <FaToggleOff className='text-sm' />
                                </button>
                            );

                            return (
                                <tr key={index} className='border-b'>
                                    <td className='border px-4 py-2 text-center'>
                                        <input type='checkbox' />
                                    </td>
                                    <td className='border px-4 py-2'>{menu.name}</td>
                                    <td className='border px-4 py-2'>{menu.link}</td>
                                    <td className='border px-4 py-2'>{menu.type}</td>
                                    <td className='border px-4 py-2 text-center'>
                                        {jsxStatus}
                                        <button 
                                            className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            onClick={() => navigate(`/admin/menu/update/${menu.id}`)} // Sử dụng navigate
                                        >
                                            <FaEdit className='text-sm' />
                                        </button>
                                        <button 
                                            className='bg-gray-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            onClick={() => navigate(`/admin/menu/show/${menu.id}`)} // Sử dụng navigate
                                        >
                                            <FaEye className='text-sm' />
                                        </button>
                                        <button 
                                            className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            onClick={() => deleteMenu(menu.id)}
                                        >
                                            <FaTrashAlt className='text-sm' />
                                        </button>
                                    </td>
                                    <td className='border px-4 py-2 text-center'>{menu.id}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MenuList;
