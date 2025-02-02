import { Route, Routes } from "react-router";
import HomePage from "./components/pages/HomePage";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import PageNotFound from "./components/pages/PageNotFound";
import Policy from "./components/pages/Policy";
import Register from "./components/pages/Auth/Register";
import Login from "./components/pages/Auth/Login";
import DashBoard from "./components/pages/user/DashBoard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./components/pages/Auth/ForgotPassword";
import CreateCategory from "./components/pages/admin/CreateCategory";
import AdminMenu from './components/Layout/AdminMenu'
import CreateProduct from "./components/pages/admin/CreateProduct";
import Products from "./components/pages/admin/Products";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashBoard from "./components/pages/admin/AdminDashBoard";
import UpdateProduct from "./components/pages/admin/UpdateProduct";
import UserDashBoard from "./components/pages/user/DashBoard";
import UserRoute from "./components/Routes/UserRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashBoard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/update-product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />

          <Route path="admin/admin-menu" element={<AdminMenu />} />
        </Route>
        <Route path="/dashboard" element={<UserRoute />}>
          <Route path="user" element={<UserDashBoard />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/policy" element={<Policy />} />
      </Routes>

    </>
  );
}

export default App;
