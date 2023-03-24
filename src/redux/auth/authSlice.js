import { createSlice } from "@reduxjs/toolkit";
import { signup, login, logout, fetchCurrentUser } from './authOperations'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: { name: null, email: null },
        token: null,
        isLoggedIn: false,
        isRefreshing: false,
    },
    extraReducers: {
        [signup.fulfilled](state, { payload }) {
            state.user.email = payload.user.email;
            // state.token = payload.token;
            // state.isLoggedIn = true;
        },

        [login.fulfilled](state, { payload }) {
            state.user = payload.user;
            state.token = payload.token;
            state.isLoggedIn = true;
        },

        [logout.fulfilled](state) {
            state.user = null;
            state.token = '';
            state.isLoggedIn = false;
        },

        [fetchCurrentUser.fulfilled](state, { payload }) {
            state.user = payload;
            state.isLoggedIn = true;
        },
    }
})

export const authReducer = authSlice.reducer