import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Query from "./pages/Query";
import Login from "./components/Login";
import Reg from "./components/Reg";
import Cart from "./pages/Cart";
import Product from "./components/Product";
import AdminDashoard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AddProducts from "./admin/AddProducts";
import EditProducts from "./admin/EditProducts";
import AdminQuery from "./admin/AdminQuery";
import QueryReply from "./admin/QueryReply";
import Checkout from "./pages/Checkout";
import Shipping from "./pages/Shipping";
import MyOrders from "./pages/MyOrders";
import ProductDetails from "./pages/ProductDetails";
import NewArrivals from "./pages/NewArrivals";
import Testimonials from "./pages/Testimonials";
import TopBrands from "./pages/TopBrands";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* USER ROUTES WITH NAVBAR & FOOTER */}
        <Route
          path="/"
          element={
            <UserLayout>
              <HomePage />
            </UserLayout>
          }
        />
        <Route
          path="/query"
          element={
            <UserLayout>
              <Query />
            </UserLayout>
          }
        />
        <Route
          path="/login"
          element={
            <UserLayout>
              <Login />
            </UserLayout>
          }
        />
        <Route
          path="/reg"
          element={
            <UserLayout>
              <Reg />
            </UserLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <UserLayout>
              <Cart />
            </UserLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <UserLayout>
              <Checkout />
            </UserLayout>
          }
        />
        <Route
          path="/shipping"
          element={
            <UserLayout>
              <Shipping />
            </UserLayout>
          }
        />
        <Route
          path="/my-orders"
          element={
            <UserLayout>
              <MyOrders />
            </UserLayout>
          }
        />
        <Route
          path="/products"
          element={
            <UserLayout>
              <Product />
            </UserLayout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <UserLayout>
              <ProductDetails />
            </UserLayout>
          }
        />
        <Route
          path="/topbrands"
          element={
            <UserLayout>
              <TopBrands />
            </UserLayout>
          }
        />
        <Route
          path="/new-arrivals"
          element={
            <UserLayout>
              <NewArrivals />
            </UserLayout>
          }
        />
        <Route
          path="/testimonials"
          element={
            <UserLayout>
              <Testimonials />
            </UserLayout>
          }
        />

        {/* ADMIN ROUTES WITH ADMIN LAYOUT */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <ProtectedAdminRoute element={<AdminDashoard />} />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/adminproduct"
          element={
            <AdminLayout>
              <ProtectedAdminRoute element={<AdminProducts />} />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/add-products"
          element={
            <AdminLayout>
              <ProtectedAdminRoute element={<AddProducts />} />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/edit-product/:id"
          element={
            <AdminLayout>
              <ProtectedAdminRoute element={<EditProducts />} />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/adminquery"
          element={
            <AdminLayout>
              <ProtectedAdminRoute element={<AdminQuery />} />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/queryreply/:id"
          element={
            <AdminLayout>
              <ProtectedAdminRoute element={<QueryReply />} />
            </AdminLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
