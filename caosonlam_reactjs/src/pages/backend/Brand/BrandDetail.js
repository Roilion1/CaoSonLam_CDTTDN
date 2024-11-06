import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BrandService from '../../../services/BrandService'; // Đảm bảo rằng đường dẫn đến service là chính xác

const BrandDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [brand, setBrand] = useState(null);

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const response = await BrandService.show(id); // Gọi API để lấy thương hiệu theo ID
                if (response.status) {
                    setBrand(response.brand);
                } else {
                    alert(response.message);
                }
            } catch (error) {
                console.error('Error fetching brand:', error);
            }
        };

        fetchBrand();
    }, [id]);

    if (!brand) return <div>Loading...</div>;

    return (
        <div className='bg-white p-5 rounded-lg'>
            <h1 className='text-2xl font-bold'>{brand.name}</h1>
            <img 
                src={`http://localhost:8000/images/brands/${brand.image}`} 
                alt={brand.name} 
                className='w-100 h-100 object-cover rounded-lg my-4' 
            />
            <p><strong>Mô tả:</strong> {brand.description}</p>
            <p><strong>Trạng thái:</strong> {brand.status === 1 ? 'Hoạt động' : 'Không hoạt động'}</p>
            <p><strong>ID:</strong> {brand.id}</p>
        </div>
    );
};

export default BrandDetail;
