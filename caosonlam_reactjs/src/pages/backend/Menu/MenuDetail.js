import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MenuService from '../../../services/MenuService';

const MenuDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [menu, setMenu] = useState(null);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await MenuService.show(id); // Gọi API để lấy menu theo ID
                if (response.status) {
                    setMenu(response.menu);
                } else {
                    alert(response.message);
                }
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };

        fetchMenu();
    }, [id]);

    if (!menu) return <div>Loading...</div>;

    return (
        <div className='bg-white p-5 rounded-lg'>
            <h1 className='text-2xl font-bold'>{menu.name}</h1>
            <p><strong>Link:</strong> {menu.link}</p>
            <p><strong>Loại:</strong> {menu.type}</p>
            <p><strong>Table ID:</strong> {menu.table_id}</p>
            <p><strong>Trạng thái:</strong> {menu.status === 1 ? 'Hoạt động' : 'Không hoạt động'}</p>
            <p><strong>Được tạo bởi:</strong> {menu.created_by}</p>
            <p><strong>Được cập nhật bởi:</strong> {menu.updated_by}</p>
            <p><strong>Ngày tạo:</strong> {menu.created_at}</p>
            <p><strong>Ngày cập nhật:</strong> {menu.updated_at}</p>
            <p><strong>ID:</strong> {menu.id}</p>
        </div>
    );
};

export default MenuDetail;
