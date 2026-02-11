import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const storedAuth = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;

export const initialState = {
    authData: storedAuth?.user || null,
    isAuthenticated: storedAuth?.isAuthenticated || false,
    token: storedAuth?.token || null,
    isLoading: false,
    registerLoading: false,
    error: null,
};

// login User
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password, role }, { rejectWithValue }) => {
        try {
            const userResponse = await fetch("http://localhost:5001/auth");
            if (!userResponse.ok) {
                throw new Error("something went wrong while logging in");
            };
            let users = await userResponse.json();

            const existingUser = users.find((user) => user.email === email && user.password === password && user.role === role);

            if (!existingUser) {
                return rejectWithValue("Invalid Credentials");
            };

            return existingUser;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

// Register User
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (newUser, { rejectWithValue }) => {
        try {
            const userResponse = await fetch("http://localhost:5001/auth");
            if (!userResponse.ok) {
                throw new Error("something went wrong while logging in");
            };
            let users = await userResponse.json();

            const existingUser = users.find((user) => user.email === newUser.email);

            if (existingUser) {
                return rejectWithValue("User Already Exists");
            };

            const response = await fetch("http://localhost:5001/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });
            if (!response.ok) {
                throw new Error("something went wrong while registering new user");
            };
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.authData = null;
            state.token = null;
            state.error = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.registerLoading = false;

            localStorage.removeItem("auth");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const fakeToken = btoa(
                    JSON.stringify({
                        id: action.payload.id,
                        role: action.payload.role,
                        time: Date.now(),
                    })
                );

                state.isLoading = false;
                state.isAuthenticated = true;
                state.token = fakeToken;
                state.authData = action.payload;
                state.error = null;

                localStorage.setItem("auth", JSON.stringify({
                    user: action.payload,
                    isAuthenticated: true,
                    token: fakeToken,
                }));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.registerLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                const fakeToken = btoa(
                    JSON.stringify({
                        id: action.payload.id,
                        role: action.payload.role,
                        time: Date.now(),
                    })
                );

                state.registerLoading = false;
                state.token = fakeToken;
                state.authData = action.payload;
                state.error = null;

                localStorage.setItem("auth", JSON.stringify({
                    user: action.payload,
                    isAuthenticated: true,
                    token: fakeToken,
                }));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.registerLoading = false;
                state.error = action.payload;
            })
    },
});

export const { logout } = AuthSlice.actions;

export default AuthSlice.reducer;