import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrashAlt } from 'react-icons/fa';
import CategoryService from './../../../services/CategoryService';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CategoryList = () => {
    const [categorys, setCategorys] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const result = await CategoryService.index();
            setCategorys(result.categorys);
        })();
    }, []);

    // Hàm xử lý xóa category
    const handleDestroy = async (id) => {
       try {
            await axios.get(`http://127.0.0.1:8000/api/category/delete/${id}`);
            setCategorys(categorys.filter(category => category.id !== id));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const statusCategory = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/category/status/${id}`);
            setCategorys(categorys.map(category => {
                if (category.id === id) {
                    category.status = (category.status === 1) ? 0 : 1;
                }
                return category;
            }));
        } catch (error) {
            console.error('Error changing category status:', error);
        }
    };

    

    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-3xl uppercase text-green-800'>QUẢN LÝ Danh Mục</h1>
                </div>
                <div className='basis-1/2 text-right'>
                    <Link to="/admin/category/create" className="text-sm ml-2">create</Link>
                    <Link to="/admin/category/trash" className="text-sm ml-2">Trash</Link>
                </div>
            </div>
            <div className='bg-white p-3 border rounded-lg'>
                <table className='table-auto w-full text-center border-collapse'>
                    <thead>
                        <tr className='border-b'>
                            <th className='border px-4 py-2 w-9'>#</th>
                            <th className='border px-4 py-2 w-28'>Hình ảnh</th> 
                            <th className='border px-4 py-2 w-40'>Tên category</th> 
                            <th className='border px-4 py-2 w-40'>Parent Category</th>
                            <th className='border px-4 py-2 w-56'>Chức năng</th> 
                            <th className='border px-4 py-2 w-9'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y'>
                        {categorys && categorys.length > 0 && categorys.map((category, index) => {
                            const jsxStatus = category.status === 1 ? (
                                <button onClick={() => statusCategory(category.id)} className='bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                    <FaToggleOn className='text-sm' />
                                </button>
                            ) : (
                                <button onClick={() => statusCategory(category.id)} className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
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
                                            <img src={`http://localhost:8000/images/categorys/${category.image}`} alt={category.name} className='w-24 h-24 object-cover' />
                                        </div>
                                    </td>
                                    <td className='border px-4 py-2'>{category.name}</td>
                                    <td className='border px-4 py-2'>{category.parent_id}</td>
                                    <td className='border px-4 py-2 text-center'>
                                        {jsxStatus}
                                        <button 
                                            className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            onClick={() => navigate(`/admin/category/update/${category.id}`)} // Sử dụng navigate
                                        >
                                            <FaEdit className='text-sm' />
                                        </button>
                                        <button 
                                            className='bg-gray-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            onClick={() => navigate(`/admin/category/show/${category.id}`)} // Sử dụng navigate
                                        >
                                            <FaEye className='text-sm' />
                                        </button>
                                        <button 
                                            className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            onClick={() => handleDestroy(category.id)}
                                        >
                                            <FaTrashAlt className='text-sm' />
                                        </button>
                                    </td>
                                    <td className='border px-4 py-2 text-center'>{category.id}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryList;
