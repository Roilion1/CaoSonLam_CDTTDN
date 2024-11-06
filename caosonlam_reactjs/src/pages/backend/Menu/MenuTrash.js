import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaToggleOff, FaToggleOn, FaTrash } from 'react-icons/fa';
import { GiNotebook } from "react-icons/gi";
import MenuService from '../../../services/MenuService';
import { MdOutlineRestore } from 'react-icons/md';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const Trash = () => {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const result = await MenuService.trash();
                setMenus(result.menus);
            } catch (error) {
                console.error('Error fetching menus:', error);
            }
        })();
    }, []);

    const deleteMenu = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/menu/destroy/${id}`);
            setMenus(menus.filter(menu => menu.id !== id));
        } catch (error) {
            console.error('Error deleting menu:', error);
        }
    };

    const restoreMenu = async (id) => {
        try {
            await axios.get(`${API_BASE_URL}/menu/restore/${id}`);
            setMenus(menus.filter(menu => menu.id !== id));
        } catch (error) {
            console.error('Error restoring menu:', error);
        }
    };

    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-2xl uppercase text-green-800'>QUẢN LÝ MENU</h1>
                </div>
                <div className='flex gap-2 px-60'>
                    <div className='hover:text-blue-700'>Thêm</div>
                    <div className='hover:text-blue-700'>Xoá</div>
                </div>
            </div>
            <div className='bg-white p-3 border rounded-lg'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope="col" className='w-9'>#</th>
                            <th scope="col" className='px-10'>Tên Menu</th>
                            <th scope="col" className='px-10'>Link</th>
                            <th scope="col" className='px-10'>Loại</th>
                            <th scope="col" className='px-40'>Chức năng</th>
                            <th scope="col" className='px-10'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {menus && menus.length > 0 && menus.map((menu, index) => {
                            const statusButton = menu.status === 1 ? (
                                <button className='bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                    <FaToggleOn className='text-sm' />
                                </button>
                            ) : (
                                <button className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                    <FaToggleOff className='text-sm' />
                                </button>
                            );

                            return (
                                <tr key={index}>
                                    <td className='text-center'>
                                        <input type='checkbox' />
                                    </td>
                                    <td>{menu.name}</td>
                                    <td>{menu.link}</td>
                                    <td>{menu.type}</td>
                                    <td className='text-center text-3xl'>
                                        {statusButton}
                                        <button onClick={() => restoreMenu(menu.id)} className='bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                            <MdOutlineRestore className='text-sm' />
                                        </button>
                                        <button className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                            <GiNotebook className='text-sm' />
                                        </button>
                                        <button
                                            onClick={() => deleteMenu(menu.id)}
                                            className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                        >
                                            <FaTrash className='text-sm' />
                                        </button>
                                    </td>
                                    <td className='text-center'>{menu.id}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Trash;
