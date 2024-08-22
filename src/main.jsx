import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import App from './App.jsx'
import './index.css'
import UserLayout from './layouts/UserLayout'
import LoginPage from './pages/LoginPage';
import { RecoilRoot } from 'recoil';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/user/CartPage';
import CustomerServicePage from './pages/CustomerServicePage';
import SellerLayout from './layouts/SellerLayout';
import SellerHomePage from './pages/seller/SellerHomePage';
import UserProfilePage from './pages/user/UserProfilePage';
import MyProductsPage from './pages/seller/MyProductsPage';
import OrdersPage from './pages/user/OrdersPage';
import AdminLayout from './layouts/AdminLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminHomePage from './pages/admin/AdminHomePage';
import ShowSellerList from './pages/admin/ShowSellerList';
import AdminRoute from './protected routes/AdminRoute';
import GettingOrdersPage from './pages/seller/GettingOrdersPage';
import SellerRoute from './protected routes/SellerRoute';
import UserRoute from './protected routes/UserRoute';


const router = createBrowserRouter([
  {
    element: <UserLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/sign-up',
        element: <SignUpPage />
      },
      {
        path: '/customer-service',
        element: <CustomerServicePage />
      },
      {
        path: '/profile',
        element: <UserRoute><UserProfilePage /></UserRoute>
      },
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/products',
        element: <ProductListingPage />
      },
      {
        path: '/product/:id',
        element: <ProductDetailsPage />
      },
      {
        path: '/cart',
        element: <UserRoute><CartPage /></UserRoute>
      },
      {
        path: '/orders',
        element: <UserRoute><OrdersPage /></UserRoute>
      }
    ]
  },
  {
    element: <SellerLayout />,
    children: [
      {
        path: '/seller/home',
        element: <SellerRoute><SellerHomePage /></SellerRoute>
      },
      {
        path: '/seller/my-products',
        element: <SellerRoute><MyProductsPage /></SellerRoute>
      },
      {
        path: '/seller/customer-service',
        element: <SellerRoute><CustomerServicePage /></SellerRoute>
      },
      {
        path: '/seller/orders',
        element: <SellerRoute><GettingOrdersPage /></SellerRoute>
      },
      {
        path: '/seller/profile',
        element: <SellerRoute><UserProfilePage /> </SellerRoute>
      }
    ]
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: '/admin/login',
        element: <AdminLoginPage />
      },
      {
        path: '/admin/home',
        element: <AdminRoute> <AdminHomePage /> </AdminRoute>
      },
      {
        path: '/admin/product-list',
        element: <AdminRoute> <ShowSellerList /> </AdminRoute>
      }
    ]
  }
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
      <ToastContainer autoClose={1000} position="bottom-left" />
    </RecoilRoot>
  </StrictMode>
)
