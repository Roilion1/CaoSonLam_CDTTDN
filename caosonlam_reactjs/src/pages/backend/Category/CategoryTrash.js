import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaToggleOff, FaToggleOn, FaTrash } from 'react-icons/fa';
import { GiNotebook } from 'react-icons/gi';
import { MdOutlineRestore } from 'react-icons/md';
import CategoryService from '../../../services/CategoryService';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const Trash = () => {
    const [categorys, setcategorys] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const result = await CategoryService.trash();
                setcategorys(result.categorys);
            } catch (error) {
                console.error('Lỗi khi tải danh mục:', error);
            }
        })();
    }, []);

    const deleteCategory = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/category/destroy/${id}`);
            setcategorys(categorys.filter(category => category.id !== id));
        } catch (error) {
            console.error('Lỗi khi xóa danh mục:', error);
        }
    };

    const restoreCategory = async (id) => {
        try {
            await axios.get(`${API_BASE_URL}/category/restore/${id}`);
            setcategorys(categorys.filter(category => category.id !== id));
        } catch (error) {
            console.error('Lỗi khi khôi phục danh mục:', error);
        }
    };

    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-2xl uppercase text-green-800'>QUẢN LÝ DANH MỤC</h1>
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
                            <th scope="col" className='px-10'>Hình ảnh</th>
                            <th scope="col" className='px-10'>Tên danh mục</th>
                            <th scope="col" className='px-40'>Chức năng</th>
                            <th scope="col" className='px-10'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {categorys && categorys.length > 0 && categorys.map((category, index) => {
                            const statusButton = category.status === 1 ? (
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
                                    <td>
                                        <img
                                            src={`http://localhost:8000/images/categorys/${category.image}`}
                                            alt={category.name}
                                            width="100"
                                            height="100"
                                            className='py-2'
                                        />
                                    </td>
                                    <td>{category.name}</td>
                                    <td className='text-center text-3xl'>
                                        {statusButton}
                                        <button onClick={() => restoreCategory(category.id)} className='bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                            <MdOutlineRestore className='text-sm' />
                                        </button>
                                        <button className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                            <GiNotebook className='text-sm' />
                                        </button>
                                        <button
                                            onClick={() => deleteCategory(category.id)}
                                            className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                        >
                                            <FaTrash className='text-sm' />
                                        </button>
                                    </td>
                                    <td className='text-center'>{category.id}</td>
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
