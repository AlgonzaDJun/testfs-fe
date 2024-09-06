import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  _id?: string;
  nama_produk: string;
  harga: number;
  stok: number;
  deskripsi: string;
  image?: string;
}

interface ProductState {
  products: Product[];
  product?: Product | null;
  status: "idle" | "loading" | "failed" | "success";
  message?: string;
}

const initialState: ProductState = {
  products: [],
  status: "idle",
};

export const getProductsAsync = createAsyncThunk(
  "product/getProducts",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/product`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        return error.response.data.message;
      } else if (error instanceof Error) {
        return error.message;
      }
      return "Gagal mendapatkan data produk";
    }
  }
);

export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (product: Product, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/product`,
        product,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Gagal menambahkan produk");
    }
  }
);

export const getProductByIdAsync = createAsyncThunk(
  "product/getProductById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Gagal mendapatkan data produk");
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (product: Product, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/product/${product._id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Gagal mengupdate produk");
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "product/deleteProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Gagal menghapus produk");
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET PRODUCTS
      .addCase(getProductsAsync.pending, (state) => {
        state.status = "loading";
        state.message = "";
        state.products = [];
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload.data;
      })
      .addCase(getProductsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      })
      //   CREATE PRODUCT
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.message = action.payload.message;
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      })
      // GET PRODUCT BY ID
      .addCase(getProductByIdAsync.pending, (state) => {
        state.status = "loading";
        state.message = "";
        state.product = null;
      })
      .addCase(getProductByIdAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.product = action.payload.data;
      })
      .addCase(getProductByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      })
      //   UPDATE PRODUCT
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.message = action.payload.message;
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      });

    // DELETE PRODUCT
    builder
      .addCase(deleteProductAsync.pending, (state) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.message = action.payload.message;
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      });
  },
});

export default productSlice.reducer;
