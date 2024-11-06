import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BannerService from '../../../services/BannerService';

const BannerDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [banner, setBanner] = useState(null);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await BannerService.show(id); // Gọi API để lấy banner theo ID
                if (response.status) {
                    setBanner(response.banner);
                } else {
                    alert(response.message);
                }
            } catch (error) {
                console.error('Error fetching banner:', error);
            }
        };

        fetchBanner();
    }, [id]);

    if (!banner) return <div>Loading...</div>;

    return (
        <div className='bg-white p-5 rounded-lg'>
            <h1 className='text-2xl font-bold'>{banner.name}</h1>
            <img 
                src={`http://localhost:8000/images/banners/${banner.image}`} 
                alt={banner.name} 
                className='w-100 h-100 object-cover rounded-lg my-4' 
            />
            <p><strong>Vị trí:</strong> {banner.position}</p>
            <p><strong>Mô tả:</strong> {banner.description}</p>
            <p><strong>Trạng thái:</strong> {banner.status === 1 ? 'Hoạt động' : 'Không hoạt động'}</p>
            <p><strong>ID:</strong> {banner.id}</p>
        </div>
    );
};

export default BannerDetail;
