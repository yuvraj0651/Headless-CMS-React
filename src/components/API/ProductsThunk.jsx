import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const storedProducts = localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : null;

export const initialState = {
    productsData: storedProducts?.products || [],
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    error: null,
};

// Fetch All Products
export const fetchAllProducts = createAsyncThunk(
    "products/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            let response = await fetch("http://localhost:5000/products");
            if (!response.ok) {
                throw new Error("something went wrong while fetching all products");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Add New Product
export const AddingProducts = createAsyncThunk(
    "products/AddingProducts",
    async (newProduct, { rejectWithValue }) => {
        try {
            let response = await fetch("http://localhost:5000/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });
            if (!response.ok) {
                throw new Error("something went wrong while adding new product");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Deleting Product
export const DeletingProducts = createAsyncThunk(
    "products/DeletingProducts",
    async (id, { rejectWithValue }) => {
        try {
            let response = await fetch(`http://localhost:5000/products/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("something went wrong while deleting product");
            };
            return id;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Updating Product
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            let response = await fetch(`http://localhost:5000/products/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error("something went wrong while updating product");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const ProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.productsData = null;
            state.isLoading = false;
            state.addLoading = false;
            state.deleteLoading = false;
            state.updateLoading = false;
            state.error = null;

            localStorage.removeItem("products");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productsData = action.payload;
                state.error = null;

                localStorage.setItem("products", JSON.stringify({
                    products: state.productsData,
                }));
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(AddingProducts.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(AddingProducts.fulfilled, (state, action) => {
                state.addLoading = false;
                state.productsData.push(action.payload);
                state.error = null;

                localStorage.setItem("products", JSON.stringify({
                    products: state.productsData,
                }));
            })
            .addCase(AddingProducts.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload;
            })
            .addCase(DeletingProducts.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(DeletingProducts.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.productsData = state.productsData.filter((product) => product.id !== action.payload);
                state.error = null;

                localStorage.setItem("products", JSON.stringify({
                    products: state.productsData,
                }));
            })
            .addCase(DeletingProducts.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload;
            })
            .addCase(updateProduct.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.productsData = state.productsData.map((product) => product.id === action.payload.id ? action.payload : product);
                state.error = null;

                localStorage.setItem("products", JSON.stringify({
                    products: state.productsData,
                }))
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload;
            })
    },
});

export const { clearCart } = ProductSlice.actions;

export default ProductSlice.reducer;