import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    stats: [],
    categories: [],
    orders: [],
    isLoading: false,
    error: null,
};

// Fetch Dashboard Data
export const fetchDashboardData = createAsyncThunk(
    "dashboard/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const [statsRes, categoryRes, ordersRes] = await Promise.all([
                fetch("http://localhost:5001/dashboardStats"),
                fetch("http://localhost:5001/categoryShare"),
                fetch("http://localhost:5001/recentOrders"),
            ]);
            if (!statsRes.ok || !categoryRes.ok || !ordersRes.ok) {
                throw new Error("Failed to fetch dashboard data");
            };
            const stats = await statsRes.json();
            const categories = await categoryRes.json();
            const orders = await ordersRes.json();

            return { stats, categories, orders }
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const DashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.stats = action.payload.stats;
                state.categories = action.payload.categories;
                state.orders = action.payload.orders;
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default DashboardSlice.reducer;