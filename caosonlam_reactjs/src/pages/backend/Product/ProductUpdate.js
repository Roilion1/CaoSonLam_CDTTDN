import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductService from '../../../services/ProductService';
import axios from 'axios';

const ProductUpdate = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate(); // Khởi tạo useNavigate
    const [product, setProduct] = useState({
        name: '',
        slug: '',
        category_id: '',
        brand_id: '',
        content: '',
        price: '',
        description: '',
        status: 1,
        image: null,
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await ProductService.show(id);
                setProduct(result.product);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin sản phẩm:', error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setProduct({
            ...product,
            image: e.target.files[0], 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(product).forEach(([key, value]) => {
            formData.append(key, value);
        });
        // Chỉ thêm hình ảnh nếu có
        if (product.image) {
            formData.append('image', product.image);
        }

        try {
            await axios.post(`http://127.0.0.1:8000/api/product/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Cập nhật sản phẩm thành công');
            navigate('/admin/product'); 
        } catch (error) {
            console.error('Lỗi khi cập nhật sản phẩm:', error);
            alert('Có lỗi xảy ra khi cập nhật sản phẩm');
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Cập nhật Sản phẩm</h2>
            {/* Hiển thị hình ảnh hiện tại */}
            {product.image && (
                <div className="mb-4">
                    <img 
                        src={`http://127.0.0.1:8000/image/products/${product.image}`} 
                        alt="Product" 
                        className="w-full h-auto rounded mb-4" 
                    />
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Tên Sản phẩm:</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Slug:</label>
                    <input
                        type="text"
                        name="slug"
                        value={product.slug}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Danh mục ID:</label>
                    <input
                        type="text"
                        name="category_id"
                        value={product.category_id}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Thương hiệu ID:</label>
                    <input
                        type="text"
                        name="brand_id"
                        value={product.brand_id}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Nội dung:</label>
                    <textarea
                        name="content"
                        value={product.content}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Giá:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Mô tả:</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Trạng thái:</label>
                    <select
                        name="status"
                        value={product.status}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value={1}>Hiện</option>
                        <option value={0}>Ẩn</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Hình ảnh (nếu có):</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Cập nhật
                </button>
            </form>
        </div>
    );
};

export default ProductUpdate;
