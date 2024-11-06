import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../../../services/ProductService'; // Dịch vụ để gọi API cho sản phẩm

const ProductDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [product, setProduct] = useState(null);
    const [productImages, setProductImages] = useState([]); // Khởi tạo là một mảng rỗng

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await ProductService.show(id); // Gọi API để lấy sản phẩm theo ID
                if (response.status) {
                    setProduct(response.product);
                    setProductImages(response.productImages || []); // Đảm bảo luôn là một mảng
                } else {
                    alert(response.message);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className='bg-white p-5 rounded-lg'>
            <h1 className='text-2xl font-bold'>{product.name}</h1>
            {/* Hiển thị hình ảnh của sản phẩm từ bảng product-image */}
            {Array.isArray(productImages) && productImages.length > 0 ? ( // Kiểm tra xem productImages có phải là mảng và có phần tử không
                <img 
                    src={`http://localhost:8000/images/products/${product[0].thumbnail}`} 
                    alt={product.name} 
                    className='w-full h-auto object-cover rounded-lg my-4' 
                />
            ) : (
                <p>No images available</p>
            )}
            <p><strong>Giá:</strong> {product.price} VNĐ</p>
            <p><strong>Mô tả:</strong> {product.description}</p>
            <p><strong>Danh mục:</strong> {product.category}</p>
            <p><strong>Số lượng trong kho:</strong> {product.stock}</p>
            <p><strong>Trạng thái:</strong> {product.status === 1 ? 'Hoạt động' : 'Không hoạt động'}</p>
            <p><strong>ID:</strong> {product.id}</p>
        </div>
    );
};

export default ProductDetail;
