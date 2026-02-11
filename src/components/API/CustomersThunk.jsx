import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    customersData: [],
    isLoading: false,
    error: null,
};

// Fetch All Customers
export const fetchAllCustomers = createAsyncThunk(
    "customers/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            let response = await fetch("http://localhost:5000/users");
            if (!response.ok) {
                throw new Error("something went wrong while fetching customers data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const CustomerSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCustomers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllCustomers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.customersData = action.payload;
                state.error = null;
            })
            .addCase(fetchAllCustomers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export default CustomerSlice.reducer;