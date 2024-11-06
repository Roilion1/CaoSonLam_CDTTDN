import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BannerService from '../../../services/BannerService';
import axios from 'axios';

const BannerUpdate = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate(); // Khởi tạo useNavigate
    const [banner, setBanner] = useState({
        name: '',
        position: '',
        link: '',
        status: 1,
        description: '',
        sort_order: '',
        image: null,
    });

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const result = await BannerService.show(id);
                setBanner(result.banner);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin banner:', error);
            }
        };
        fetchBanner();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBanner((banner) => ({
            ...banner,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setBanner({
            ...banner,
            image: e.target.files[0], 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(banner).forEach(([key, value]) => {
            formData.append(key, value);
            formData.append('image', banner.image);
        });

        try {
            await axios.post(`http://127.0.0.1:8000/api/banner/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Cập nhật banner thành công');
            navigate('/admin/banner'); 
        } catch (error) {
            console.error('Lỗi khi cập nhật banner:', error);
            alert('Có lỗi xảy ra khi cập nhật banner');
        }
    };

    return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Cập nhật Banner</h2>
        {/* Hiển thị hình ảnh sau khi cập nhật */}
        {banner.image && (
            <div className="mb-4">
                <img 
                    src={`http://127.0.0.1:8000/image/banners/${banner.image}`} 
                    alt="Banner" 
                    className="w-full h-auto rounded mb-4" 
                />
            </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">

            <div className="form-group">
                <label className="block text-gray-600 mb-1">Tên Banner:</label>
                <input
                    type="text"
                    name="name"
                    value={banner.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="form-group">
                <label className="block text-gray-600 mb-1">Vị trí:</label>
                <input
                    type="text"
                    name="position"
                    value={banner.position}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="form-group">
                <label className="block text-gray-600 mb-1">Link:</label>
                <input
                    type="text"
                    name="link"
                    value={banner.link}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="form-group">
                <label className="block text-gray-600 mb-1">Mô tả:</label>
                <textarea
                    name="description"
                    value={banner.description}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="form-group">
                <label className="block text-gray-600 mb-1">Sắp xếp:</label>
                <input
                    type="number"
                    name="sort_order"
                    value={banner.sort_order}
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

export default BannerUpdate;
