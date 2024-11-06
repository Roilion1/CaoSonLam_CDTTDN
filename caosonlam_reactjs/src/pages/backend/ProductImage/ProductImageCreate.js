import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductImageService from '../../../services/ProductImageService';

function ProductImageCreate() {
    const [productImage, setProductImage] = useState({
        thumbnail: null,
        product_id: '', // Sản phẩm liên quan đến hình ảnh
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductImage({
            ...productImage,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setProductImage({
            ...productImage,
            thumbnail: e.target.files[0],
        });
    };

    const handleAddProductImage = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('thumbnail', productImage.thumbnail);
        formData.append('product_id', productImage.product_id);

        try {
            await ProductImageService.add(formData);
            navigate('/admin/productimage');
        } catch (error) {
            setError('Có lỗi xảy ra khi thêm hình ảnh sản phẩm');
            console.error(error);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Thêm Hình Ảnh Sản Phẩm</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleAddProductImage} className="space-y-4">

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Hình ảnh:</label>
                    <input
                        type="file"
                        name="thumbnail"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">ID Sản Phẩm:</label>
                    <input
                        type="text"
                        name="product_id"
                        value={productImage.product_id}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Thêm Hình Ảnh
                </button>
            </form>
        </div>
    );
}

export default ProductImageCreate;
