import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = state => state.contacts.items;
export const selectContactsStatus = state => state.contacts.status
export const selectContactsError = state => state.contacts.error

export const selectFilter = state => state.filter;

export const visibleContacts = createSelector([selectContacts, selectFilter],
    (contacts, filterValue) => {
        const filteredContacts = contacts.filter(person =>
            person.name.toLowerCase().includes(filterValue.toLowerCase())
        );

        return filteredContacts || contacts;
    })

export const selectAuth = state => state.auth