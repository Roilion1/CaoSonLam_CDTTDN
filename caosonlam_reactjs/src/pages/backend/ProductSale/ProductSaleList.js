import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrashAlt } from 'react-icons/fa';
import ProductSaleService from './../../../services/ProductSaleService';

const ProductSaleList = () => {
    const [productSales, setProductSales] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await ProductSaleService.index();
            setProductSales(result.productsales);
        })();
    }, []);

    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-3xl uppercase text-green-800'>QUẢN LÝ PRODUCT SALE</h1>
                </div>
                <div className='basis-1/2 text-right'>Huong</div>
            </div>
            <div className='bg-white p-3 border rounded-lg'>
                <table className='table-auto w-full text-center'>
                    <thead>
                        <tr>
                            <th className='w-9'>#</th>
                            <th>Hình ảnh</th>
                            <th>Tên product_sale</th>
                            <th>Giá</th>
                            <th className='w-40'>Chức năng</th>
                            <th className='w-9'>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productSales && productSales.length > 0 && productSales.map((productSale, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-center'>
                                        <input type='checkbox' />
                                    </td>
                                    <td>
                                        <img src={`http://localhost:8000/images/banners/${productSale.image}`} alt={productSale.name} width="100" height="100" />
                                    </td>
                                    <td>{productSale.product_id}</td>
                                    <td>{productSale.price_sale}</td>
                                    <td className='text-center'>
                                        {productSale.status === 1 ? (
                                            <button className='bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                <FaToggleOn className='text-sm' />
                                            </button>
                                        ) : (
                                            <button className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                <FaToggleOff className='text-sm' />
                                            </button>
                                        )}
                                        <button className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                            <FaEdit className='text-sm' />
                                        </button>
                                        <button className='bg-gray-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                            <FaEye className='text-sm' />
                                        </button>
                                        <button className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                            <FaTrashAlt className='text-sm' />
                                        </button>
                                    </td>
                                    <td className='text-center'>{productSale.id}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductSaleList;