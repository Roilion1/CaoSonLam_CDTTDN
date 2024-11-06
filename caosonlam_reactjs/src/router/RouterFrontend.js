import Home from './../pages/frontend/Home';
import Product from '../pages/frontend/Home/Product/Product';
import AllProductsPage from '../pages/frontend/Product/AllProductsPage';
import CategoryProductsPage from '../pages/frontend/Product/CategoryProductsPage';
import Login from '../pages/frontend/Auth/Login';
import Register from '../pages/frontend/Auth/Register';

const RouterFrontend = [
  { path: "/", element: <Home /> }, 
  { path: "/product", element: <Product /> }, 
  { path: "/all-products", element: <AllProductsPage /> },
  { path: "/category-products/:categoryId", element: <CategoryProductsPage /> },
  { path: "/Register", element: <Register /> },
  { path: "/Login", element: <Login /> },
];

export default RouterFrontend;
