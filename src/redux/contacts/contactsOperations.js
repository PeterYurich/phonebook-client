import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const {REACT_APP_BASE_URL} = process.env

// axios.defaults.baseURL = 'https://connections-api.herokuapp.com'
axios.defaults.baseURL = `${REACT_APP_BASE_URL}/api`;


export const fetchContacts = createAsyncThunk("contacts/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/contacts");
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    })

export const addContact = createAsyncThunk("contacts/addContact",
    async (newContact, thunkAPI) => {
        try {
            const res = await axios.post("/contacts", newContact)
            const {name, phone, _id} = res.data
            return {name, phone, _id}
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const deleteContact = createAsyncThunk("contacts/deleteContact",
    async (contactId, thunkAPI) => {
        try {
            const res = await axios.delete(`/contacts/${contactId}`);
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)