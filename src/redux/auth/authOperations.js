import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const {REACT_APP_BASE_URL} = process.env

// import { useNavigate, Navigate } from "react-router-dom";

// axios.defaults.baseURL = 'https://connections-api.herokuapp.com';
axios.defaults.baseURL = `${REACT_APP_BASE_URL}/api`;


const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};

export const signup = createAsyncThunk('users/signup', async (credentials,
    { rejectWithValue }) => {
        try {
            const { data } = await axios.post('users/signup', credentials)
            
            // navigate(`http://localhost:4000/api/users/verify/${data.verificationCode}`)
            await axios.get(`users/verify/${data.user.verificationCode}`)
            // const {data: dataRes} = await axios.post('users/login', {email: credentials.name, password: credentials.password})
            // console.log("dataRes", dataRes)

            // const navigate = useNavigate()
            // navigate("/login")
            // setAuthHeader(data.token)
        return data
    } catch (error) {
        if (error.response.status === 400) {
            alert("Invalid data. Enter you real email, please!")
        }
        return rejectWithValue(error.message)
    }
})

export const login = createAsyncThunk('auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('users/login', credentials)
            setAuthHeader(data.token)
            return data
        } catch (error) {
            if (error.response.status === 400) {
                alert("Can't log in. Check you verification data, please!")
            }
            return rejectWithValue(error.message)
        }
    })

export const logout = createAsyncThunk('auth/logout', async (credentials,
    { rejectWithValue }) => {
    try {
        const { data } = await axios.patch('users/logout', credentials)
        clearAuthHeader()
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const fetchCurrentUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
    const persistedToken = thunkAPI.getState().auth.token
    if (!persistedToken) { return thunkAPI.rejectWithValue('') }
    setAuthHeader(persistedToken)
    try {
        const { data } = await axios.get('users/current')
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})