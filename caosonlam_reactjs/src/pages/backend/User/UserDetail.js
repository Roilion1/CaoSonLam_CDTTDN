import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../../../services/UserService';

const UserDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await UserService.show(id); // Gọi API để lấy user theo ID
                if (response.status) {
                    setUser(response.user);
                } else {
                    alert(response.message);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [id]);

    if (!user) return <div>Loading...</div>;

    return (
        <div className='bg-white p-5 rounded-lg'>
            <h1 className='text-2xl font-bold'>{user.name}</h1>
            <img 
                src={`http://localhost:8000/images/userImages/${user.thumbnail}`} 
                alt={user.name} 
                className='w-100 h-100 object-cover rounded-lg my-4' 
            />
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Số điện thoại:</strong> {user.phone}</p>
            <p><strong>Giới tính:</strong> {user.gender === 'male' ? 'Nam' : 'Nữ'}</p>
            <p><strong>Địa chỉ:</strong> {user.address}</p>
            <p><strong>Vai trò:</strong> {user.roles}</p>
            <p><strong>Trạng thái:</strong> {user.status === 1 ? 'Hoạt động' : 'Không hoạt động'}</p>
            <p><strong>ID:</strong> {user.id}</p>
        </div>
    );
};

export default UserDetail;
