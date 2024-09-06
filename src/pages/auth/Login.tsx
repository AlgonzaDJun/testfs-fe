import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginAsync } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  if (localStorage.getItem("token")) {
    window.location.href = "/";
  }

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auths);


  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    dispatch(loginAsync(data));
  };

  useEffect(() => {
    if (user.status === "success") {
      localStorage.setItem("token", user.token!);
      localStorage.setItem("userId", user.userId!);

      toast.success("Login success", {
        position: "top-right",
        autoClose: 2000,
        onClose: () => {
          window.location.href = "/";
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
      <div className="bg-white p-8 rounded-2xl shadow-md w-full md:max-w-3xl">
        <img
          src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=1060&t=st=1725605150~exp=1725605750~hmac=a5d72cd3ecf7524771f876a98d372b969ca022d0e58c54f075131cdc93dcac4d"
          className="mx-auto w-56"
        />
        <br />
        <h2 className="text-3xl font-bold mb-4 text-center text-[#435EBE]">
          Login
        </h2>
        <div className="text-center"></div>
        <form className="space-y-4">
          <div className="block text-md font-medium text-gray-700">
            <label>Email:</label> <br />
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:border-[#435EBE] focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="email"
              placeholder="enter your email"
              value={data.email}
              onChange={handleInput}
            />
          </div>

          <div className="block text-md font-medium text-gray-700">
            <label>Password:</label>
            <br />
            <input
              type="password"
              className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:border-[#435EBE] focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="password"
              placeholder="enter your password"
              value={data.password}
              onChange={handleInput}
            />{" "}
            <br />
          </div>
          <button
            onClick={handleLogin}
            className="w-full py-2 px-4 border border-transparent rounded-xl shadow-sm text-white bg-[#435EBE] hover:bg-[#3d55ab] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
          >
            Login
          </button>
          <br />
          <p className=" text-center">
            Don't have an account?
            <Link
              to="/register"
              style={{ cursor: "pointer", color: "#435EBE" }}
            >
              <u>
                <b> Sign Up</b>
              </u>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
