import Dashboard from './../pages/backend/Dashboard';

import BannerList from '../pages/backend/Banner/BannerList';
import BannerTrash from './../pages/backend/Banner/BannerTrash';
import BannerCreate from './../pages/backend/Banner/BannerCreate';
import BannerUpdate from './../pages/backend/Banner/BannerUpdate';
import BannerDetail from './../pages/backend/Banner/BannerDetail';

import BrandList from './../pages/backend/Brand/BrandList';
import BrandCreate from './../pages/backend/Brand/BrandCreate';
import BrandTrash from './../pages/backend/Brand/BrandTrash';
import BrandDetail from './../pages/backend/Brand/BrandDetail';
import BrandUpdate from './../pages/backend/Brand/BrandUpdate';

import CategoryList from './../pages/backend/Category/CategoryList';
import CategoryTrash from './../pages/backend/Category/CategoryTrash';
import CategoryCreate from './../pages/backend/Category/CategoryCreate';
import CategoryUpdate from './../pages/backend/Category/CategoryUpdate';
import CategoryDetail from './../pages/backend/Category/CategoryDetail';

import ProductList from './../pages/backend/Product/ProductList';
import ProductTrash from './../pages/backend/Product/ProductTrash';
import ProductCreate from './../pages/backend/Product/ProductCreate';
import ProductDetail from './../pages/backend/Product/ProductDetail';
import ProductUpdate from './../pages/backend/Product/ProductUpdate';

import ProductsaleList from './../pages/backend/ProductSale/ProductSaleList';

import ProductstoreList from './../pages/backend/ProductStore/ProductStoreList';

import ProductImageList from './../pages/backend/ProductImage/ProductImageList';

import ConfigList from './../pages/backend/Config/ConfigList';

import ContactList from './../pages/backend/Contact/ContactList';

import MenuList from '../pages/backend/Menu/MenuList';
import MenuDetail from './../pages/backend/Menu/MenuDetail';
import MenuCreate from './../pages/backend/Menu/MenuCreate';
import MenuTrash from './../pages/backend/Menu/MenuTrash';
import MenuUpdate from './../pages/backend/Menu/MenuUpdate';


import OrderList from './../pages/backend/Order/OrderList';

import TopicList from './../pages/backend/Topic/TopicList';

import PostList from './../pages/backend/Post/PostList';

import UserList from './../pages/backend/User/UserList';
import UserCreate from './../pages/backend/User/UserCreate';
import UserTrash from './../pages/backend/User/UserTrash';
import UserUpdate from './../pages/backend/User/UserUpdate';
import UserDetail from './../pages/backend/User/UserDetail';







const RouterBackend = [
  { path: "", element: <Dashboard /> }, 
  
  {
    path: "banner",
      children: [
        { path: "", element: <BannerList /> },
        { path: "trash", element: <BannerTrash /> },
        { path: "create", element: <BannerCreate /> },
        { path: "update/:id", element: <BannerUpdate /> },
        { path: "show/:id", element: <BannerDetail /> },
      ],
  },

  { 
    path: "brand", 
      children: [
        { path: "", element: <BrandList /> },
        { path: "trash", element: <BrandTrash /> },
        { path: "create", element: <BrandCreate /> },
        { path: "update/:id", element: <BrandUpdate /> },
        { path: "show/:id", element: <BrandDetail /> },
      ],
  },

  { 
    path: "category", 
      children: [
        { path: "", element: <CategoryList /> },
        { path: "trash", element: <CategoryTrash /> },
        { path: "create", element: <CategoryCreate /> },
        { path: "update/:id", element: <CategoryUpdate /> },
        { path: "show/:id", element: <CategoryDetail /> },
      ],
  },

  { path: "product", 
    children: [
        { path: "", element: <ProductList /> },
        { path: "trash", element: <ProductTrash /> },
        { path: "create", element: <ProductCreate /> },
        { path: "update/:id", element: <ProductUpdate /> },
        { path: "show/:id", element: <ProductDetail /> },
      ],
  },

  { path: "productsale", element: <ProductsaleList /> },
  { path: "productstore", element: <ProductstoreList /> }, 
  { path: "productimage", element: <ProductImageList /> }, 
  { path: "config", element: <ConfigList /> },
  { path: "contact", element: <ContactList /> },

  { 
    path: "menu", 
    children: [
        { path: "", element: <MenuList /> },
        { path: "trash", element: <MenuTrash /> },
        { path: "create", element: <MenuCreate /> },
        { path: "update/:id", element: <MenuUpdate /> },
        { path: "show/:id", element: <MenuDetail /> },
      ],
  },

  { path: "order", element: <OrderList /> },
  { path: "topic", element: <TopicList /> },
  { path: "post", element: <PostList /> },

  { 
    path: "user", 
    children: [
        { path: "", element: <UserList /> },
        { path: "trash", element: <UserTrash /> },
        { path: "create", element: <UserCreate /> },
        { path: "update/:id", element: <UserUpdate /> },
        { path: "show/:id", element: <UserDetail /> },
      ],
  },
];

export default RouterBackend;
