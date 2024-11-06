import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CategoryService from '../../../services/CategoryService';

const CategoryDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [category, setCategory] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await CategoryService.show(id); // Gọi API để lấy category theo ID
                if (response.status) {
                    setCategory(response.category);
                } else {
                    alert(response.message);
                }
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        fetchCategory();
    }, [id]);

    if (!category) return <div>Loading...</div>;

    return (
        <div className='bg-white p-5 rounded-lg'>
            <h1 className='text-2xl font-bold'>{category.name}</h1>
            <img 
                src={`http://localhost:8000/images/categorys/${category.image}`} 
                alt={category.name} 
                className='w-100 h-100 object-cover rounded-lg my-4' 
            />
            <p><strong>Mô tả:</strong> {category.description}</p>
            <p><strong>Trạng thái:</strong> {category.status === 1 ? 'Hoạt động' : 'Không hoạt động'}</p>
            <p><strong>ID:</strong> {category.id}</p>
        </div>
    );
};

export default CategoryDetail;
