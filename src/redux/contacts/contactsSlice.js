import { createSlice } from "@reduxjs/toolkit";
import { Notify } from "notiflix";

import { fetchContacts, deleteContact, addContact } from "./contactsOperations";

const handleRejected = (state, { payload }) => {
    state.error = payload;
    state.items = [];
    state.status = null;
    if (payload = 'Request failed with status code 409') {
        Notify.failure("The name exists already! Type another name")
    }
};

const contactsSlice = createSlice({
    name: "contacts",
    initialState: {
        items: [],
        error: null,
        status: null
    },
    extraReducers: {
        [fetchContacts.pending](state) {
            state.status = "fetching";
        },
        [fetchContacts.fulfilled](state, { payload }) {
            state.error = null;
            state.items = payload;
            state.status = null;
        },
        [fetchContacts.rejected]: handleRejected,

        [deleteContact.pending](state, { payload }) {
            console.log(payload)
        },
        [deleteContact.pending](state, action) {
            state.status = `${action.meta.arg}`
        },
        [deleteContact.fulfilled](state, { payload }) {
            state.error = null;
            const index = state.items.findIndex(contact => contact._id === payload._id);
            state.items.splice(index, 1);
            state.status = null;
        },
        [deleteContact.rejected]: handleRejected,

        [addContact.pending](state) {
            state.status = "adding";
        },
        [addContact.fulfilled](state, { payload }) {
            state.error = null;
            state.items.push(payload)
            state.status = null;
            Notify.success(`${payload.name} has added to you phonebook!`);
        },
        [addContact.rejected]: handleRejected,

    }
})

export const contactsReducer = contactsSlice.reducer;