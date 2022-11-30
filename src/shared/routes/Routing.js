import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./screens/home/Login";
import Private from "./Private";
import Public from "./Public";
import AdminLogin from "./screens/AdminLogin";
import Categories from "./screens/dashboard/Categories";
import CreateCategory from "./screens/dashboard/CreateCategory";
import CreateProductForm from "./screens/dashboard/CreateProductForm";
import EditProduct from "./screens/dashboard/EditProduct";
import Products from "./screens/dashboard/Products";
import UpdateCategory from "./screens/dashboard/UpdateCategory";
import Home from "./screens/home/Home";
import Register from "./screens/home/Register";
import Dashboard from "./screens/users/Dashboard";
import UserRoute from "./UserRoute";
import UserAuthRoute from "./UserAuthRoute";
import CatProducts from "./screens/home/CatProducts";
import ProductDetails from "./screens/home/ProductDetails";
import SearchProduct from "./screens/home/SearchProduct";
import Cart from "./screens/home/Cart";

const Routing = () => {
  return (
    <>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />

        {/* category by name route */}
        <Route path="cat-products/:name" element={<CatProducts />} />
        <Route path="cat-products/:name/:page" element={<CatProducts />} />

        {/* Search Products by name route */}
        <Route path="search-products/:keyword/:page" element={<SearchProduct />} />

        {/* category by name route */}
        <Route path="product/:id" element={<ProductDetails />} />

        {/* cart route */}
        <Route path="cart" element={<Cart />} />
        
        {/* Login Route */}
        <Route element={<UserAuthRoute />}>
        <Route path="login" element={<Login />} />
        </Route>

        {/* Register Route */}
        <Route element={<UserAuthRoute />}>
          <Route path="register" element={<Register />} />
        </Route>

        {/* user Dashboard Route */}
        <Route element={<UserRoute />}>
          <Route path="user" element={<Dashboard />} />
        </Route>

        <Route path="auth">
          <Route
            path="admin-login"
            element={
              <Public>
                <AdminLogin />
              </Public>
            }
          />
        </Route>

        <Route path="dashboard">
          <Route
            path="products"
            element={
              <Private>
                <Products />
              </Private>
            }
          />
          <Route
            path="products/:page"
            element={
              <Private>
                <Products />
              </Private>
            }
          />
          <Route
            path="edit-product/:id"
            element={
              <Private>
                <EditProduct />
              </Private>
            }
          />
          <Route
            path="categories"
            element={
              <Private>
                <Categories />
              </Private>
            }
          />
          <Route
            path="categories/:page"
            element={
              <Private>
                <Categories />
              </Private>
            }
          />
          <Route
            path="create-category"
            element={
              <Private>
                <CreateCategory />
              </Private>
            }
          />
          <Route
            path="update-category/:id"
            element={
              <Private>
                <UpdateCategory />
              </Private>
            }
          />
          <Route
            path="create-product"
            element={
              <Private>
                <CreateProductForm />
              </Private>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default Routing;
