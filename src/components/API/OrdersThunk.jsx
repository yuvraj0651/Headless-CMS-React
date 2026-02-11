import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const initialState = {
    ordersData: [],
    isLoading: false,
    error: null,
};

// Fetch ALl Products
export const fetchAllOrders = createAsyncThunk(
    "orders/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            let response = await fetch("http://localhost:5000/cart");
            if (!response.ok) {
                throw new Error("something went wrong while fetching order items");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const OrderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrders.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.ordersData = action.payload;
                state.error = null;
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
});

export default OrderSlice.reducer;