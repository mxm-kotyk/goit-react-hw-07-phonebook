import { createSelector } from '@reduxjs/toolkit';

export const selectIsLoading = state => state.contacts.isLoading;

export const selectIsAdding = state => state.contacts.isAdding;

export const selectIsDeleting = state => state.contacts.isDeleting;

export const selectError = state => state.contacts.error;

export const selectContacts = state => state.contacts.items;

export const selectFilter = state => state.filter;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }
);
