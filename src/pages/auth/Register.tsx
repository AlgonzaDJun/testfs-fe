import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { registerAsync } from "../../redux/features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  if (localStorage.getItem("token")) {
    window.location.href = "/";
  }

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auths);

  const [data, setData] = useState({
    nama: "",
    email: "",
    jenis_kelamin: "",
    password: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const checkDataIfEmpty = () => {
    for (const key in data) {
      if (data[key as keyof typeof data] === "") {
        return true;
      }
    }
    return false;
  };

  const handleRegist = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (checkDataIfEmpty()) {
      toast.error("Data tidak boleh kosong", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    dispatch(registerAsync(data));
  };

  useEffect(() => {
    if (user.status === "success") {
      toast.success("Register success", {
        position: "top-right",
        autoClose: 2000,
        onClose: () => {
          window.location.href = "/login";
        },
      });
    } else if (user.status === "failed") {
      toast.error(user.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  }, [user]);

  return (
    <div className=" bg-[#F2F7FF] min-h-screen flex items-center justify-center px-6">
      <ToastContainer />
      <div className="bg-white p-8 rounded-2xl shadow-md w-full md:max-w-3xl">
        <img src="undraw_sign_up_n6im.svg" className="mx-auto w-56" />
        <br />
        <h2 className="text-3xl font-bold mb-4 text-center text-[#435EBE]">
          Sign Up
        </h2>
        <div className="text-center"></div>
        <form className="space-y-4">
          <div className="block text-md font-medium text-gray-700">
            <label>Nama</label> <br />
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:border-[#435EBE] focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="nama"
              placeholder="Masukkan nama"
              value={data.nama}
              onChange={handleInput}
            />
          </div>

          <div className="block text-md font-medium text-gray-700">
            <label>Email</label> <br />
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:border-[#435EBE] focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="email"
              placeholder="Masukkan Email"
              value={data.email}
              onChange={handleInput}
            />
          </div>

          <div className="block text-md font-medium text-gray-700">
            <label>Jenis Kelamin</label> <br />
            {/* <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:border-[#435EBE] focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="Jenis Kelamin"
              placeholder="Masukkan Jenis Kelamin"
              value={data.jenis_kelamin}
              onChange={handleInput}
            /> */}
            <select
              id="countries"
              name="jenis_kelamin"
              value={data.jenis_kelamin}
              onChange={handleSelect}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Pilih jenis Kelamin</option>
              <option value="L">Laki laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>

          <div className="block text-md font-medium text-gray-700">
            <label>Password</label> <br />
            <input
              type="password"
              className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:border-[#435EBE] focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="password"
              placeholder="Masukkan password"
              value={data.password}
              onChange={handleInput}
            />
          </div>

          <button
            onClick={handleRegist}
            className="w-full py-2 px-4 border border-transparent rounded-xl shadow-sm text-white bg-[#435EBE] hover:bg-[#3d55ab] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
          <p className=" text-center">
            Already have an account?
            <Link to="/" style={{ cursor: "pointer", color: "#435EBE" }}>
              <u>
                <b> Login</b>
              </u>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
