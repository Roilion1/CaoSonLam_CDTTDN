import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BannerService from '../../../services/BannerService';

function BannerCreate() {
    const [banner, setBanner] = useState({
        name: '',       
        link: '',      
        description: '', 
        image: null,
        position: 'slideshow',
        sort_order: '',  
        status: '',     
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBanner({
            ...banner,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setBanner({
            ...banner,
            image: e.target.files[0], 
        });
    };

    const handleAddBanner = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', banner.name);  
        formData.append('link', banner.link); 
        formData.append('description', banner.description); 
        formData.append('image', banner.image);
        formData.append('position', banner.position);
        formData.append('sort_order', banner.sort_order); 
        formData.append('status', banner.status);

        try {
            await BannerService.add(formData); 
            navigate('/admin/banner'); 
        } catch (error) {
            setError('Có lỗi xảy ra khi thêm banner');
            console.error(error);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Created Banner</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleAddBanner} className="space-y-4">

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Tên banner:</label>
                    <input
                        type="text"
                        name="name"
                        value={banner.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Link:</label><input
                        type="text"
                        name="link"
                        value={banner.link}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Mô tả:</label>
                    <textarea
                        name="description"
                        value={banner.description}
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Thứ tự:</label>
                    <input
                        type="number"
                        name="sort_order"
                        value={banner.sort_order}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Trạng thái:</label>
                    <select
                        name="status"
                        value={banner.status}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Chọn trạng thái</option>
                        <option value="1">Hoạt động</option>
                        <option value="0">Không hoạt động</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Thêm Banner
                </button>
            </form>
        </div>
    );
}

export default BannerCreate;