import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  deleteProductAsync,
  getProductsAsync,
} from "../../redux/features/product/productSlice";
import { Link } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { toast } from "react-toastify";

const Product = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductsAsync());
  }, []);

  useEffect(() => {
    if (data.message === "Product deleted") {
      toast.success("Product deleted", {
        position: "top-right",
        autoClose: 2000,
      });
      dispatch(getProductsAsync());
    }
  }, [data]);

  const [openModal, setOpenModal] = useState(false);
  const [productId, setProductId] = useState("");

  const handleOpenModal = (id: string) => {
    setProductId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setProductId("");
    setOpenModal(false);
  };

  const handleDeleteProduct = () => {
    dispatch(deleteProductAsync(productId));
    setOpenModal(false);
  };

  return (
    <div className="p-5">
      <h1 className="mt-2 font-semibold text-xl">Halaman produk anda</h1>

      {/* button tambah product */}
      <Link
        to="/product/tambah"
        className="bg-blue-500 text-white px-3 py-2 rounded-md mt-5 inline-block"
        
      >
        Tambah Produk
      </Link>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nama produk
              </th>
              <th scope="col" className="px-6 py-3">
                Harga
              </th>
              <th scope="col" className="px-6 py-3">
                Deskripsi
              </th>
              <th scope="col" className="px-6 py-3">
                Stok
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {data.products.length > 0 ? (
              data.products.map((product) => (
                <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product.nama_produk}
                  </th>
                  <td className="px-6 py-4">
                    {product.harga.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    {product.deskripsi.length > 50
                      ? product.deskripsi.substring(0, 50) + "..."
                      : product.deskripsi}
                  </td>
                  <td className="px-6 py-4">{product.stok}</td>
                  <td className="px-6 py-4">
                    <a
                      href={`/product/${product._id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-5"
                    >
                      Edit
                    </a>

                    <button
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => handleOpenModal(product._id!)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Belum ada produk
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL CONFIRM DELETE */}

      <Modal
        show={openModal}
        size="md"
        onClose={() => handleCloseModal()}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Delete Product
            </h2>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDeleteProduct()}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => handleCloseModal()}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Product;
