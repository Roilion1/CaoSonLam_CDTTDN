import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import ProductImageService from '../../../services/ProductImageService';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductImageList = () => {
    const [productImages, setProductImages] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await ProductImageService.index();
            setProductImages(result.productImages);
        })();
    }, []);

    const deleteProductImage = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/productimage/delete/${id}`);
            setProductImages(productImages.filter(image => image.id !== id));
        } catch (error) {
            console.error('Error deleting product image:', error);
        }
    };

    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-3xl uppercase text-green-800'>QUẢN LÝ HÌNH ẢNH SẢN PHẨM</h1>
                </div>
                <div className='basis-1/2 text-right'>
                    <Link to="/admin/productimage/create" className="text-sm  ml-2">create</Link>
                </div>
            </div>
            <div className='bg-white p-3 border rounded-lg'>
                <table className='table-auto w-full text-center border-collapse'>
                    <thead>
                        <tr className='border-b'>
                            <th className='border px-4 py-2'>#</th>
                            <th className='border px-4 py-2'>Hình ảnh</th>
                            <th className='border px-4 py-2'>Chức năng</th>
                            <th className='border px-4 py-2'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y'>
                        {productImages && productImages.length > 0 && productImages.map((image, index) => (
                            <tr key={index} className='border-b'>
                                <td className='border px-4 py-2'>{index + 1}</td>
                                <td className='border px-4 py-2'>
                                    <img src={`http://localhost:8000/images/productimages/${image.thumbnail}`} alt="ProductImage" className='w-24 h-24 object-cover' />
                                </td>
                                <td className='border px-4 py-2 text-center'>
                                    <button className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                        <FaEdit className='text-sm' />
                                    </button>
                                    <button 
                                        className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                        onClick={() => deleteProductImage(image.id)}
                                    >
                                        <FaTrashAlt className='text-sm' />
                                    </button>
                                </td>
                                <td className='border px-4 py-2'>{image.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductImageList;
