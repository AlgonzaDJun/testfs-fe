import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getProductByIdAsync,
  updateProductAsync,
} from "../../redux/features/product/productSlice";
import { toast } from "react-toastify";

const DetailProduct = () => {
  const id = useParams<{ id: string }>().id;

  const product = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

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

    const dataWithId = {
      ...data,
      _id: id,
    };
    dispatch(updateProductAsync(dataWithId));
  };

  useEffect(() => {
    dispatch(getProductByIdAsync(id!));
  }, []);

  useEffect(() => {
    if (product.product) {
      setData({
        nama_produk: product.product.nama_produk,
        harga: product.product.harga,
        deskripsi: product.product.deskripsi,
        stok: product.product.stok,
      });
    }

    if (product.message === "Product updated") {
      dispatch(getProductByIdAsync(id!));
      toast.success("Product updated", {
        position: "top-right",
        autoClose: 1500,
        onClose: () => {
          window.location.href = "/product";
        },
      });
    }

    if (product.status === "failed" && typeof product.message === "string") {
      toast.error(product.message, {
        position: "top-right",
        autoClose: 1500,
      });
    }
  }, [product]);

  return (
    <div className="p-5">
      <h1 className="mt-2 font-semibold text-xl">Lihat/ Update Produk Anda</h1>
      <form className="mt-5">
        {product.status === "failed" && typeof product.message === "object" ? (
          <div className="text-red-500">Data tidak ditemukan</div>
        ) : (
          <>
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
              Update
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default DetailProduct;
