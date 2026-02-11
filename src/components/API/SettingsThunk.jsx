import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    settingsData: {},
    loading: false,
    error: null,
    success: false,
};

const BASE_URL = "http://localhost:5001";

// 🔹 FETCH SETTINGS
export const fetchSettings = createAsyncThunk(
    "settings/fetchSettings",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/settings`);

            if (!response.ok) {
                throw new Error("Failed to fetch settings");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// 🔹 UPDATE SETTINGS
export const updateSettings = createAsyncThunk(
    "settings/updateSettings",
    async (updatedData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/settings`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error("Failed to update settings");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // FETCH
            .addCase(fetchSettings.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.settingsData = action.payload;
            })
            .addCase(fetchSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // UPDATE
            .addCase(updateSettings.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.settingsData = action.payload;
                state.success = true;
            })
            .addCase(updateSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetStatus } = settingsSlice.actions;
export default settingsSlice.reducer;
