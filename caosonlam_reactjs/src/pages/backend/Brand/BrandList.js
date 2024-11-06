import React, { useEffect, useState } from 'react'; 
import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrashAlt } from 'react-icons/fa';
import BrandService from './../../../services/BrandService';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BrandList = () => {
    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const result = await BrandService.index();
            setBrands(result.brands);
        })();
    }, []);

    // Hàm xử lý xóa brand
    const deleteBrand = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/brand/delete/${id}`);
            setBrands(brands.filter(brand => brand.id !== id));
        } catch (error) {
            console.error('Error deleting banner:', error);
        }
    };

    const statusBrand = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/brand/status/${id}`);
            setBrands(brands.map(brand => {
                if (brand.id === id) {
                    brand.status = (brand.status === 1) ? 0 : 1;
                }
                return brand;
            }));
        } catch (error) {
            console.error('Error changing brand status:', error);
        }
    };


    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-3xl uppercase text-green-800'>QUẢN LÝ BRAND</h1>
                </div>
                <div className='basis-1/2 text-right'>
                    <Link to="/admin/brand/create" className="text-sm ml-2">create</Link>
                    <Link to="/admin/brand/trash" className="text-sm ml-2">Trash</Link>
                </div>
            </div>
            <div className='bg-white p-3 border rounded-lg'>
                <table className='table-auto w-full text-center border-collapse'>
                    <thead>
                        <tr className='border-b'>
                            <th className='border px-4 py-2 w-9'>#</th>
                            <th className='border px-4 py-2 w-28'>Hình ảnh</th> {/* Giới hạn kích thước cột hình ảnh */}
                            <th className='border px-4 py-2 w-40'>Tên brand</th> {/* Giảm chiều rộng cột tên brand */}
                            <th className='border px-4 py-2 w-56'>Chức năng</th> {/* Tăng chiều rộng cột chức năng */}
                            <th className='border px-4 py-2 w-9'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y'>
                        {brands && brands.length > 0 && brands.map((brand, index) => {
                            const jsxStatus = brand.status === 1 ? (
                                <button onClick={() => statusBrand(brand.id)} className='bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                    <FaToggleOn className='text-sm' />
                                </button>
                            ) : (
                                <button onClick={() => statusBrand(brand.id)} className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
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
                                            <img src={`http://localhost:8000/images/brands/${brand.image}`} alt={brand.name} className='w-24 h-24 object-cover' />
                                        </div>
                                    </td>
                                    <td className='border px-4 py-2'>{brand.name}</td>
                                    <td className='border px-4 py-2 text-center'>
                                        {jsxStatus}
                                        <button 
                                            className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            onClick={() => navigate(`/admin/brand/update/${brand.id}`)} // Sử dụng navigate
                                        >
                                            <FaEdit className='text-sm' />
                                        </button>
                                        <button 
                                            className='bg-gray-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            onClick={() => navigate(`/admin/brand/show/${brand.id}`)} // Sử dụng navigate
                                        >
                                            <FaEye className='text-sm' />
                                        </button>
                                        <button 
                                            className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            onClick={() => deleteBrand(brand.id)}
                                        >
                                            <FaTrashAlt className='text-sm' />
                                        </button>
                                    </td>
                                    <td className='border px-4 py-2 text-center'>{brand.id}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BrandList;
