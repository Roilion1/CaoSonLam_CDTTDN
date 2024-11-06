import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BrandService from '../../../services/BrandService';
import axios from 'axios';

const BrandUpdate = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate(); // Khởi tạo useNavigate
    const [brand, setBrand] = useState({
        name: '',
        slug: '',
        description: '',
        status: 1,
        sort_order: '',
        image: null,
    });

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const result = await BrandService.show(id);
                setBrand(result.brand);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin thương hiệu:', error);
            }
        };
        fetchBrand();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBrand((brand) => ({
            ...brand,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setBrand({
            ...brand,
            image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(brand).forEach(([key, value]) => {
            formData.append(key, value);
            formData.append('image', brand.image);
        });

        try {
            await axios.post(`http://127.0.0.1:8000/api/brand/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Cập nhật thương hiệu thành công');
            navigate('/admin/brand'); 
        } catch (error) {
            console.error('Lỗi khi cập nhật thương hiệu:', error);
            alert('Có lỗi xảy ra khi cập nhật thương hiệu');
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Cập nhật Thương hiệu</h2>
            {/* Hiển thị hình ảnh nếu có */}
            {brand.image && (
                <div className="mb-4">
                    <img 
                        src={`http://127.0.0.1:8000/images/brands/${brand.image}`} 
                        alt="Brand" 
                        className="w-full h-auto rounded mb-4" 
                    />
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Tên Thương hiệu:</label>
                    <input
                        type="text"
                        name="name"
                        value={brand.name}
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
                        value={brand.slug}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Mô tả:</label>
                    <textarea
                        name="description"
                        value={brand.description}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* <div className="form-group">
                    <label className="block text-gray-600 mb-1">Trạng thái:</label>
                    <select
                        name="status"
                        value={brand.status}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value={1}>Kích hoạt</option>
                        <option value={0}>Không kích hoạt</option>
                    </select>
                </div> */}

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Sắp xếp:</label>
                    <input
                        type="number"
                        name="sort_order"
                        value={brand.sort_order}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Hình ảnh:</label>
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

export default BrandUpdate;
