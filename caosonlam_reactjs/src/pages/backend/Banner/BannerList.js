import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrashAlt } from 'react-icons/fa';
import BannerService from '../../../services/BannerService';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BannerList = () => {
    const [banners, setBanners] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const result = await BannerService.index();
            setBanners(result.banners);
        })();
    }, []);

    // Hàm xử lý xóa banner
    const deleteBanner = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/banner/delete/${id}`);
            setBanners(banners.filter(banner => banner.id !== id));
        } catch (error) {
            console.error('Error deleting banner:', error);
        }
    };

    const statusBanner = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/banner/status/${id}`);
            setBanners(banners.map(banner => {
                if (banner.id === id) {
                    banner.status = (banner.status === 1) ? 0 : 1;
                }
                return banner;
            }));
        } catch (error) {
            console.error('Error changing banner status:', error);
        }
    };


    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-3xl uppercase text-green-800'>QUẢN LÝ BANNER</h1>
                </div>
                <div className='basis-1/2 text-right'>
                    <Link to="/admin/banner/create" className="text-sm ml-2">create</Link>
                    <Link to="/admin/banner/trash" className="text-sm ml-2">Trash</Link>
                </div>
            </div>
            <div className='bg-white p-3 border rounded-lg'>
                <table className='table-auto w-full text-center border-collapse'>
                    <thead>
                        <tr className='border-b'>
                            <th className='border px-4 py-2 w-9'>#</th>
                            <th className='border px-4 py-2 w-28'>Hình ảnh</th>
                            <th className='border px-4 py-2 w-40'>Tên banner</th>
                            <th className='border px-4 py-2 w-40'>Tên vị trí</th>
                            <th className='border px-4 py-2 w-56'>Chức năng</th>
                            <th className='border px-4 py-2 w-9'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y'>
                        {banners && banners.length > 0 && banners.map((banner, index) => {
                            const jsxStatus = banner.status === 1 ? (
                                <button onClick={() => statusBanner(banner.id)} className='bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                    <FaToggleOn className='text-sm' />
                                </button>
                            ) : (
                                <button onClick={() => statusBanner(banner.id)} className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
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
                                            <img src={`http://localhost:8000/images/banners/${banner.image}`} alt={banner.name} className='w-24 h-24 object-cover' />
                                        </div>
                                    </td>
                                    <td className='border px-4 py-2'>{banner.name}</td>
                                    <td className='border px-4 py-2'>{banner.position}</td>
                                    <td className='border px-4 py-2 text-center'>
                                        {jsxStatus}
                                        <button 
                                            className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            onClick={() => navigate(`/admin/banner/update/${banner.id}`)} // Sử dụng navigate
                                        >
                                            <FaEdit className='text-sm' />
                                        </button>
                                        <button 
                                            className='bg-gray-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            onClick={() => navigate(`/admin/banner/show/${banner.id}`)} // Sử dụng navigate
                                        >
                                            <FaEye className='text-sm' />
                                        </button>
                                        <button 
                                            className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            onClick={() => deleteBanner(banner.id)}
                                        >
                                            <FaTrashAlt className='text-sm' />
                                        </button>
                                    </td>
                                    <td className='border px-4 py-2 text-center'>{banner.id}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BannerList;
