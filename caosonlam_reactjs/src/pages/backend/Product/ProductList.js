import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrashAlt } from 'react-icons/fa';
import ProductService from '../../../services/ProductService';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const result = await ProductService.index();
            setProducts(result.products);
        })();
    }, []);

    // Hàm xử lý xóa sản phẩm
    const deleteProduct = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/product/delete/${id}`);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
        }
    };

    // Hàm thay đổi trạng thái sản phẩm
    const toggleStatus = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/product/status/${id}`);
            setProducts(products.map(product => {
                if (product.id === id) {
                    product.status = product.status === 1 ? 0 : 1;
                }
                return product;
            }));
        } catch (error) {
            console.error('Lỗi khi thay đổi trạng thái sản phẩm:', error);
        }
    };

    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-3xl uppercase text-green-800'>QUẢN LÝ SẢN PHẨM</h1>
                </div>
                <div className='basis-1/2 text-right'>
                    <Link to="/admin/product/create" className="text-sm ml-2">create</Link>
                    <Link to="/admin/product/trash" className="text-sm ml-2">Trash</Link>
                </div>
            </div>
            <div className='bg-white p-3 border rounded-lg'>
                <table className='table-auto w-full text-center border-collapse'>
                    <thead>
                        <tr className='border-b'>
                            <th className='border px-4 py-2 w-9'>#</th>
                            <th className='border px-4 py-2 w-28'>Hình ảnh</th>
                            <th className='border px-4 py-2 w-40'>Tên sản phẩm</th>
                            <th className='border px-4 py-2 w-40'>Danh mục</th>
                            <th className='border px-4 py-2 w-40'>Thương hiệu</th>
                            <th className='border px-4 py-2 w-56'>Chức năng</th>
                            <th className='border px-4 py-2 w-9'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y'>
                        {products && products.length > 0 && products.map((product, index) => {
                            const jsxStatus = product.status === 1 ? (
                                <button onClick={() => toggleStatus(product.id)} className='bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                    <FaToggleOn className='text-sm' />
                                </button>
                            ) : (
                                <button onClick={() => toggleStatus(product.id)} className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
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
                                            <img
                                                src={`http://127.0.0.1:8000/images/products/${product.images[0]?.thumbnail}`}
                                                alt={product.name}
                                                className='w-24 h-24 object-cover'
                                            />
                                        </div>
                                    </td>
                                    <td className='border px-4 py-2'>{product.name}</td>
                                    <td className='border px-4 py-2'>{product.catname}</td>
                                    <td className='border px-4 py-2'>{product.brandname}</td>
                                    <td className='border px-4 py-2 text-center'>
                                        {jsxStatus}
                                        <button 
                                            className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            onClick={() => navigate(`/admin/product/update/${product.id}`)} // Dẫn hướng đến trang cập nhật
                                        >
                                            <FaEdit className='text-sm' />
                                        </button>
                                        <button 
                                            className='bg-gray-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            onClick={() => navigate(`/admin/product/show/${product.id}`)} // Dẫn hướng đến trang chi tiết
                                        >
                                            <FaEye className='text-sm' />
                                        </button>
                                        <button 
                                            className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            onClick={() => deleteProduct(product.id)}
                                        >
                                            <FaTrashAlt className='text-sm' />
                                        </button>
                                    </td>
                                    <td className='border px-4 py-2 text-center'>{product.id}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
