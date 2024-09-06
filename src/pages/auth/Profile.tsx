import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getProfileAsync } from "../../redux/features/auth/authSlice";

const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auths);

  useEffect(() => {
    dispatch(getProfileAsync());
  }, []);

  return (
    <div className="p-5">
      <h1 className="mt-2 font-semibold text-xl text-center">Data Profile Anda</h1>

      <img src="Resume-rafiki.svg" alt="" className="w-80 max-w-full h-36 text-center mx-auto" />

      <form className="mt-5">
        <div className="block text-md font-medium text-gray-700">
          <label>Nama</label> <br />
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:border-[#435EBE] focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="nama"
            value={user.user?.nama}
            readOnly
          />
        </div>

        <div className="block text-md font-medium text-gray-700">
          <label>Email</label> <br />
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:border-[#435EBE] focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="email"
            value={user.user?.email}
            readOnly
          />
        </div>

        <div className="block text-md font-medium text-gray-700">
          <label>Jenis Kelamin</label> <br />
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:border-[#435EBE] focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="jenis_kelamin"
            value={user.user?.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}
            readOnly
          />
        </div>



        {/* <button
          className="mt-4 w-full py-2 px-4 border border-transparent rounded-xl shadow-sm text-white bg-[#435EBE] hover:bg-[#3d55ab] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit"
        >
          Submit
        </button> */}
      </form>
    </div>
  );
};

export default Profile;
