import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MenuService from '../../../services/MenuService';
import CategoryService from '../../../services/CategoryService';
import BrandService from '../../../services/BrandService';

const MenuUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [menu, setMenu] = useState({
        name: '',
        link: '',
        type: '',
        table_id: '',
        status: ''
    });

    // Dữ liệu nguồn
    const [categorys, setCategorys] = useState([]); // Khởi tạo mảng rỗng
    const [brands, setBrands] = useState([]); // Khởi tạo mảng rỗng

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryData = await CategoryService.index();
                console.log('Category Data:', categoryData.data);
                setCategorys(categoryData.data || []);  // Đảm bảo luôn là mảng

                const brandData = await BrandService.index();
                console.log('Brand Data:', brandData.data);
                setBrands(brandData.data || []); // Đảm bảo luôn là mảng

                const result = await MenuService.show(id);
                setMenu(result.menu);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMenu((menu) => ({
            ...menu,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await MenuService.update(id, menu);
            alert('Cập nhật menu thành công');
            navigate('/admin/menu');
        } catch (error) {
            console.error('Lỗi khi cập nhật menu:', error);
            alert('Có lỗi xảy ra khi cập nhật menu');
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Cập nhật Menu</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Tên Menu:</label>
                    <input
                        type="text"
                        name="name"
                        value={menu.name}
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
                        value={menu.link}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Loại:</label>
                    <select
                        name="type"
                        value={menu.type}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Chọn loại</option>
                        <option value="Category">Category</option>
                        <option value="Brand">Brand</option>
                        {/* Bỏ qua Topic và Post nếu không sử dụng */}
                    </select>
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Nguồn:</label>
                    <select
                        name="table_id"
                        value={menu.table_id}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Chọn nguồn</option>
                        {menu.type === 'Category' && Array.isArray(categorys) && categorys.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                        {menu.type === 'Brand' && Array.isArray(brands) && brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                </div>


                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Trạng thái:</label>
                    <select
                        name="status"
                        value={menu.status}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Chọn trạng thái</option>
                        <option value="Active">Kích hoạt</option>
                        <option value="Inactive">Không kích hoạt</option>
                    </select>
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

export default MenuUpdate;
