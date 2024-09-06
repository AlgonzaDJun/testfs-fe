import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createProductAsync } from "../../redux/features/product/productSlice";
import { toast } from "react-toastify";

const TambahProduct = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);

  const [data, setData] = useState({
    nama_produk: "",
    harga: 0,
    deskripsi: "",
    stok: 0,
  });

  const handleInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(createProductAsync(data));
  };

  useEffect(() => {
    console.log(products)

    if (products.status === "success" && products.message === "Product created") {
      toast.success(products.message, {
        position: "top-right",
        autoClose: 2000,
        onClose: () => {
          window.location.href = "/product";
        },
      });
    } else if (products.status === "failed") {
      toast.error(products.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  }, [products]);

  return (
    <div className="p-5">
      <h1 className="mt-2 font-semibold text-xl">Tambahkan Produk baru</h1>

      <form className="mt-5">
        <div className="block text-md font-medium text-gray-700">
          <label>Nama Produk</label> <br />
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:border-[#435EBE] focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="nama_produk"
            placeholder="Masukkan nama produk"
            value={data.nama_produk}
            onChange={handleInput}
          />
        </div>

        <div className="block text-md font-medium text-gray-700">
          <label>Harga</label> <br />
          <input
            type="number"
            className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:border-[#435EBE] focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="harga"
            placeholder="Masukkan harga"
            value={data.harga}
            onChange={handleInput}
          />
        </div>

        <div className="block text-md font-medium text-gray-700">
          <label>Deskripsi</label> <br />
          <textarea
            className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:border-[#435EBE] focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="deskripsi"
            placeholder="Masukkan deskripsi produk"
            value={data.deskripsi}
            onChange={handleInput}
          ></textarea>
        </div>

        <div className="block text-md font-medium text-gray-700">
          <label>Stok</label> <br />
          <input
            type="number"
            className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:border-[#435EBE] focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="stok"
            placeholder="Masukkan stok produk"
            value={data.stok}
            onChange={handleInput}
          />
        </div>

        <button
          className="mt-4 w-full py-2 px-4 border border-transparent rounded-xl shadow-sm text-white bg-[#435EBE] hover:bg-[#3d55ab] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TambahProduct;
