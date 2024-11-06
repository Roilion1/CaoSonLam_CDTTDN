import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaToggleOff, FaToggleOn, FaTrash } from 'react-icons/fa';
import { GiNotebook } from "react-icons/gi";
import BannerService from '../../../services/BannerService';
import { MdOutlineRestore } from 'react-icons/md';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const Trash = () => {
    const [banners, setbanners] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const result = await BannerService.trash();
                setbanners(result.banners);
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
        })();
    }, []);

    const deletebanner = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/banner/destroy/${id}`);
            setbanners(banners.filter(banners => banners.id !== id));
        } catch (error) {
            console.error('Error deleting banner:', error);
        }
    };
    const restoreBanner = async (id) => {
        try {
            await axios.get(`${API_BASE_URL}/banner/restore/${id}`);
            setbanners(banners.filter(banner => banner.id !== id));
        } catch (error) {
            console.error('Error restoring banner:', error);
        }
    };

    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-2xl uppercase text-green-800'>QUẢN LÝ SẢN PHẨM</h1>
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
                            <th scope="col" className='px-10'>Tên banner</th>
                            <th scope="col" className='px-40'>Chức năng</th>
                            <th scope="col" className='px-10'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {banners && banners.length > 0 && banners.map((banner, index) => {
                            const statusButton = banner.status === 1 ? (
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
                                            src={`http://localhost:8000/images/banners/${banner.image}`}
                                            alt={banner.name}
                                            width="100"
                                            height="100"
                                            className='py-2'
                                        />
                                    </td>
                                    <td>{banner.name}</td>
                                    <td>{banner.catname}</td>
                                    <td className='text-center text-3xl'>
                                        {statusButton}
                                            <button onClick={() => restoreBanner(banner.id)} className='bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                            <MdOutlineRestore className='text-sm' />
                                        </button>
                                        <button className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                            <GiNotebook className='text-sm' />
                                        </button>
                                        <button
                                            onClick={() => deletebanner(banner.id)}
                                            className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                        >
                                            <FaTrash className='text-sm' />
                                        </button>
                                    </td>
                                    <td className='text-center'>{banner.id}</td>
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