import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaToggleOff, FaToggleOn, FaTrash } from 'react-icons/fa';
import { GiNotebook } from "react-icons/gi";
import BrandService from '../../../services/BrandService';
import { MdOutlineRestore } from 'react-icons/md';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const Trash = () => {
    const [brands, setbrands] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const result = await BrandService.trash();
                setbrands(result.brands);
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        })();
    }, []);

    const deletebrand = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/brand/destroy/${id}`);
            setbrands(brands.filter(brand => brand.id !== id));
        } catch (error) {
            console.error('Error deleting brand:', error);
        }
    };

    const restorebrand = async (id) => {
        try {
            await axios.get(`${API_BASE_URL}/brand/restore/${id}`);
            setbrands(brands.filter(brand => brand.id !== id));
        } catch (error) {
            console.error('Error restoring brand:', error);
        }
    };

    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-2xl uppercase text-green-800'>QUẢN LÝ THƯƠNG HIỆU</h1>
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
                            <th scope="col" className='px-10'>Logo</th>
                            <th scope="col" className='px-10'>Tên thương hiệu</th>
                            <th scope="col" className='px-40'>Chức năng</th>
                            <th scope="col" className='px-10'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {brands && brands.length > 0 && brands.map((brand, index) => {
                            const statusButton = brand.status === 1 ? (
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
                                            src={`http://localhost:8000/images/brands/${brand.image}`}
                                            alt={brand.name}
                                            width="100"
                                            height="100"
                                            className='py-2'
                                        />
                                    </td>
                                    <td>{brand.name}</td>
                                    <td className='text-center text-3xl'>
                                        {statusButton}
                                        <button onClick={() => restorebrand(brand.id)} className='bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                            <MdOutlineRestore className='text-sm' />
                                        </button>
                                        <button className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                            <GiNotebook className='text-sm' />
                                        </button>
                                        <button
                                            onClick={() => deletebrand(brand.id)}
                                            className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                        >
                                            <FaTrash className='text-sm' />
                                        </button>
                                    </td>
                                    <td className='text-center'>{brand.id}</td>
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
