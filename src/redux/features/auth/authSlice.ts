import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id?: string;
  nama: string;
  email: string;
  jenis_kelamin: string;
  password?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "failed" | "success";
  message?: string;
  userId?: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
};

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        user
      );
      return response.data;
    } catch (error) {
      // Cek apakah error berasal dari Axios dengan `isAxiosError`
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        // Ambil pesan error dari backend
        return rejectWithValue(error.response.data.message);
      } else if (error instanceof Error) {
        // Untuk error yang merupakan instance dari Error
        return rejectWithValue(error.message);
      }
      // Jika tidak, gunakan pesan error default
      return rejectWithValue("Gagal mendaftar");
    }
  }
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (user: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        user
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Gagal login");
    }
  }
);

export const getProfileAsync = createAsyncThunk("auth/profile", async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/profile`,
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
    return "Gagal mendapatkan data user";
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerAsync.pending, (state) => {
        state.status = "loading";
        state.message = "";
        state.user = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.data;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      })
      // LOGIN
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
        state.message = "";
        state.user = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.userId = action.payload.userId;
        state.token = action.payload.token;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      })
      // GET PROFILE
      .addCase(getProfileAsync.pending, (state) => {
        state.status = "loading";
        state.message = "";
        state.user = null;
      })
      .addCase(getProfileAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.data;
      })
      .addCase(getProfileAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      });
  },
});

export default authSlice.reducer;
