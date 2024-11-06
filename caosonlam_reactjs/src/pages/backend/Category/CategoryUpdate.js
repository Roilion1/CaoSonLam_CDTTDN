import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CategoryService from '../../../services/CategoryService';

const CategoryUpdate = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate(); // Khởi tạo useNavigate
    const [category, setCategory] = useState({
        name: '',
        parent_id: '',
        slug: '',
        status: 1,
        description: '',
        sort_order: '',
        image: null,
    });

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const result = await CategoryService.show(id);
                setCategory(result.category);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin danh mục:', error);
            }
        };
        fetchCategory();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory((category) => ({
            ...category,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setCategory({
            ...category,
            image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(category).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.append('image', category.image);

        try {
            await axios.post(`http://127.0.0.1:8000/api/category/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Cập nhật danh mục thành công');
            navigate('/admin/category');
        } catch (error) {
            console.error('Lỗi khi cập nhật danh mục:', error);
            alert('Có lỗi xảy ra khi cập nhật danh mục');
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Cập nhật Danh mục</h2>
            {/* Hiển thị hình ảnh sau khi cập nhật */}
            {category.image && (
                <div className="mb-4">
                    <img 
                        src={`http://127.0.0.1:8000/images/categorys/${category.image}`} 
                        alt="Category" 
                        className="w-full h-auto rounded mb-4" 
                    />
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Tên Danh mục:</label>
                    <input
                        type="text"
                        name="name"
                        value={category.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Danh mục cha (ID):</label>
                    <input
                        type="text"
                        name="parent_id"
                        value={category.parent_id}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Slug:</label>
                    <input
                        type="text"
                        name="slug"
                        value={category.slug}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Mô tả:</label>
                    <textarea
                        name="description"
                        value={category.description}
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
                        value={category.sort_order}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Trạng thái:</label>
                    <select
                        name="status"
                        value={category.status}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value={1}>Hoạt động</option>
                        <option value={0}>Không hoạt động</option>
                    </select>
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

export default CategoryUpdate;
