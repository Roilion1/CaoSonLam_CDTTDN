import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const CategoryProductsPage = () => {
  const { categoryId } = useParams(); 
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState(''); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        // Lấy sản phẩm theo categoryId
        const result = await axios.get(`http://127.0.0.1:8000/api/product_category/${categoryId}/${productsPerPage}`);
        if (result.status === 200 && result.data.products) {
          setProducts(result.data.products);
        } else {
          setError('Không tìm thấy sản phẩm cho danh mục này.');
        }
      } catch (err) {
        setError('Lỗi khi lấy dữ liệu sản phẩm.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategoryName = async () => {
      try {
        // Lấy tên danh mục theo categoryId
        const result = await axios.get(`http://127.0.0.1:8000/api/category/${categoryId}`);
        if (result.status === 200 && result.data.name) {
          setCategoryName(result.data.name); 
        } else {
          setError('Không tìm thấy tên danh mục.');
        }
      } catch (err) {
        setError('Lỗi khi lấy tên danh mục.');
        console.error(err);
      }
    };

    fetchProductsByCategory();
    fetchCategoryName();
  }, [categoryId]); 

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <p className="text-center">Đang tải sản phẩm...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">SẢN PHẨM THEO DANH MỤC: {categoryName || 'Không xác định'}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(currentProducts) && currentProducts.map((product) => (
          <div className="border rounded-lg shadow-md bg-white overflow-hidden" key={product.id}>
            <img 
              className="w-full h-30 object-cover" 
              src={`http://127.0.0.1:8000/images/products/${product.images[0]?.thumbnail}`} 
              alt={product.name} 
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-xl font-bold text-gray-800">{product.price}đ</p>
              <p className="text-gray-500">Danh mục: {product.catname || 'Không xác định'}</p>
              <p className="text-gray-500">Thương hiệu: {product.brandname || 'Không xác định'}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Phần chuyển trang */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryProductsPage;
