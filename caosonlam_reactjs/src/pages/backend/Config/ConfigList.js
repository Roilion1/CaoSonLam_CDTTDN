import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrashAlt } from 'react-icons/fa';
import ConfigService from '../../../services/ConfigService';

const ConfigList = () => {
    const [configs, setConfigs] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await ConfigService.index();
            setConfigs(result.configs);
        })();
    }, []);

    // Hàm xử lý xóa banner
    const handleDestroy = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa banner này không?")) {
            try {
                const response = await ConfigService.destroy(id); 
                // Kiểm tra xem phản hồi có chứa thuộc tính 'status' không
                if (response && response.data && response.data.status) {
                    setConfigs(configs.filter(config => config.id !== id)); // Cập nhật danh sách banner
                    alert('Xóa banner thành công');
                } else {
                    alert('Không thể xóa banner');
                }
            } catch (error) {
                console.error('Lỗi khi xóa banner:', error);
                alert('Có lỗi xảy ra khi xóa banner');
            }
        }
    };

    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-3xl uppercase text-green-800'>QUẢN LÝ CONFIG</h1>
                </div>
                <div className='basis-1/2 text-right'>Huong</div>
            </div>
            <div className='bg-white p-3 border rounded-lg'>
                <table className='table-auto w-full text-center border-collapse'>
                    <thead>
                        <tr className='border-b'>
                            <th className='border px-4 py-2 w-9'>#</th>
                            {/* <th className='border px-4 py-2 w-28'>Hình ảnh</th> */}
                            <th className='border px-4 py-2 w-40'>Tên banner</th> 
                            <th className='border px-4 py-2 w-40'>Tên vị trí</th> 
                            <th className='border px-4 py-2 w-56'>Chức năng</th> 
                            <th className='border px-4 py-2 w-9'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y'>
                        {configs && configs.length > 0 && configs.map((config, index) => {
                            var jsxStatus = config.status === 1 ? (
                                <button className='bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                    <FaToggleOn className='text-sm' />
                                </button>
                            ) : (
                                <button className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                    <FaToggleOff className='text-sm' />
                                </button>
                            );
                            return (
                                <tr key={index} className='border-b'>
                                    <td className='border px-4 py-2 text-center'>
                                        <input type='checkbox' />
                                    </td>
                                    {/* <td className='border px-4 py-2'>
                                        <div className='flex justify-center items-center'>
                                            <img src={`http://localhost:8000/images/configs/${config.image}`} alt={config.name} className='w-24 h-24 object-cover' />
                                        </div>
                                    </td> */}
                                    <td className='border px-4 py-2'>{config.name}</td>
                                    <td className='border px-4 py-2'>{config.position}</td>
                                    <td className='border px-4 py-2 text-center'>
                                        {jsxStatus}
                                        <button className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                            <FaEdit className='text-sm' />
                                        </button>
                                        <button className='bg-gray-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                            <FaEye className='text-sm' />
                                        </button>
                                        <button 
                                            className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            onClick={() => handleDestroy(config.id)}
                                        >
                                            <FaTrashAlt className='text-sm' />
                                        </button>
                                    </td>
                                    <td className='border px-4 py-2 text-center'>{config.id}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ConfigList;
