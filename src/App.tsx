import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "flowbite";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Product from "./pages/product/Product";
import Profile from "./pages/auth/Profile";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./components/Logout";
import DetailProduct from "./pages/product/DetailProduct";
import TambahProduct from "./pages/product/TambahProduct";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <div className="p-2">
        <Routes>
          <Route path="/" element={<h1>Halo, selamat datang</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoute />}>
            <Route path="/product" element={<Product />} />
            <Route path="/product/tambah" element={<TambahProduct />} />
            <Route path="/product/:id" element={<DetailProduct />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
