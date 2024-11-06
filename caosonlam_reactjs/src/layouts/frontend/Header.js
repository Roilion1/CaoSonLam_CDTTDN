import React, { useEffect, useState } from "react";
import { GET_ALL } from "../../api/apiService";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // state để lưu thông tin đăng nhập
  const navigate = useNavigate();

  useEffect(() => {
    const params = {
      pageNumber: 0,
      pageSize: 4,
      sortBy: 'categoryId',
      sortOrder: 'asc',
    };

    GET_ALL('categories', params)
      .then(response => {
        setCategories(response.content);
        console.log("response", response.content);
      })
      .catch(error => {
        console.error('Failed to fetch categories:', error);
      });

    // Kiểm tra trạng thái đăng nhập
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token"); // Giả sử bạn lưu token trong localStorage
      setIsLoggedIn(!!token); // Kiểm tra xem có token không
    };
    
    checkLoginStatus();
  }, []);

  const filterProductsByName = (name) => {
    const params = {
      name: name,
      pageNumber: 0,
      pageSize: 20,
    };

    GET_ALL('products', params)
      .then(response => {
        setFilteredProducts(response.content);
        console.log("Filtered products", response.content);
      })
      .catch(error => {
        console.error('Failed to fetch filtered products:', error);
      });
  };

  // Hàm toggle menu
  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  // Hàm để đóng menu
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleProductLinkClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Ngăn không cho link hoạt động
      alert("Bạn cần đăng nhập để xem sản phẩm."); // Hiển thị thông báo
      navigate('/Login'); // Chuyển hướng đến trang đăng nhập
    }
  };

  return (
    <div>
      <header className="border-b bg-white shadow-md">
        <section className="py-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="w-1/5">
                <a href="/" className="block">
                  <img src={require("../../images/logo.png")} alt="Logo" className="w-32 h-auto" />
                </a>
              </div>
              
              <div className="w-2/5">
                <form className="w-full flex items-center bg-gray-100 rounded-lg">
                  <select className="border-r border-gray-300 p-2 bg-white text-gray-700 rounded-l-lg">
                    <option value="">All type</option>
                    <option value="special">Special</option>
                    <option value="best">Only best</option>
                    <option value="latest">Latest</option>
                  </select>
                  <input type="text" className="w-full p-2 bg-white border-none focus:outline-none" placeholder="Search for products..." />
                  <button type="submit" className="bg-blue-600 text-white p-3 rounded-r-lg">
                    <i className="fa fa-search"></i>
                  </button>
                </form>
              </div>

              <div className="flex items-center space-x-6">
                <a href="ProfileMain" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                  <i className="fa fa-user"></i>
                  <span className="text-sm">My profile</span>
                </a>
                <a href="st#" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                  <i className="fa fa-comment-dots"></i>
                  <span className="text-sm">Message</span>
                </a>
                <a href="ProfileOrder" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                  <i className="fa fa-store"></i>
                  <span className="text-sm">Orders</span>
                </a>
                <a href="/cart" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                  <i className="fa fa-shopping-cart"></i>
                  <span className="text-sm">Cart</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </header>

      <nav className="bg-blue-500">
        <div className="container mx-auto">
          <div className="flex justify-between items-center py-2">
            <button className="text-white block lg:hidden">
              <i className="fa fa-bars"></i>
            </button>
            
            <div className="hidden lg:flex space-x-6">
              <div className="relative">
                <button className="text-white flex items-center space-x-2" onClick={toggleDropdown}>
                  <i className="fa fa-bars"></i>
                  <span>Danh mục</span>
                </button>
                {dropdownOpen && ( 
                  <div className="absolute bg-white text-gray-800 mt-2 rounded-lg shadow-lg">
                    <div className="grid grid-cols-2 gap-4 p-4">
                      {/* Other Links can go here */}
                    </div>
                  </div>
                )}
              </div>

              <a href="/" className="text-white hover:text-gray-200">Trang chủ</a>
              <div className="relative">
                <button className="text-white hover:text-gray-200" onClick={toggleDropdown}>
                  Danh sách sản phẩm
                </button>
                {dropdownOpen && ( 
                  <div className="absolute bg-white text-gray-800 mt-2 rounded-lg shadow-lg">
                    <Link to="/category-products" className="block p-2 hover:bg-gray-100" onClick={handleProductLinkClick}>iPhone</Link>
                    <Link to="/category-products" className="block p-2 hover:bg-gray-100" onClick={handleProductLinkClick}>Samsung</Link>
                    <Link to="/category-products" className="block p-2 hover:bg-gray-100" onClick={handleProductLinkClick}>Xiaomi</Link>
                    <Link to="/all-products" className="block p-2 hover:bg-gray-100" onClick={handleProductLinkClick}>Tất cả sản phẩm</Link>
                  </div>
                )}
              </div>
              <a href="/Login" className="text-white hover:text-gray-200">Đăng nhập</a>
              <a href="/Register" className="text-white hover:text-gray-200">Đăng ký</a>
              <a href="/NewsPage" className="text-white hover:text-gray-200">Tin tức</a>
              <a href="st#" className="text-white hover:text-gray-200">Giới thiệu</a>
            </div>

            <div className="hidden lg:flex space-x-6">
              <a href="st#" className="text-white hover:text-gray-200">Get the app</a>
              <div className="relative">
                <button className="text-white hover:text-gray-200">English</button>
                <div className="absolute hidden group-hover:block bg-white text-gray-800 mt-2 rounded-lg shadow-lg">
                  <a href="st#" className="block p-2 hover:bg-gray-100">Russian</a>
                  <a href="st#" className="block p-2 hover:bg-gray-100">French</a>
                  <a href="st#" className="block p-2 hover:bg-gray-100">Spanish</a>
                  <a href="st#" className="block p-2 hover:bg-gray-100">Chinese</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hiển thị sản phẩm đã lọc */}
      <div className="container mx-auto mt-4">
        {filteredProducts.length > 0 ? (
          <div>
            <h2 className="text-lg font-bold">Sản phẩm đã lọc:</h2>
            <ul>
              {filteredProducts.map((product) => (
                <li key={product.id}>
                  <Link to={`/product/${product.id}`} className="text-blue-600 hover:underline">
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-600">Không có sản phẩm nào phù hợp.</p>
        )}
      </div>
    </div>
  );
}

export default Header;
