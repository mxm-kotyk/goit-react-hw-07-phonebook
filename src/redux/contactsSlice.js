import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './thunks';
import { contactsInitialState } from './state';

const isPendingAction = action => {
  return action.type.endsWith('/pending');
};

const isFulfilledAction = action => {
  return action.type.endsWith('/fulfilled');
};

const isRejectedAction = action => {
  return action.type.endsWith('/rejected');
};

const turnOffLoaders = state => {
  state.isAdding = false;
  state.isDeleting = false;
  state.isLoading = false;
};

const handleFetchContactsPending = state => {
  state.isLoading = true;
};

const handleAddContactPending = state => {
  state.isAdding = true;
};

const handleDeleteContactPending = state => {
  state.isDeleting = true;
};

const handleFetchContactsFulfilled = (state, { payload }) => {
  state.items = payload;
};

const handleAddContactFulfilled = (state, { payload }) => {
  state.items.push(payload);
};

const handleDeleteContactFulfilled = (state, { payload }) => {
  const index = state.items.findIndex(contact => contact.id === payload);
  state.items.splice(index, 1);
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handleFetchContactsPending)
      .addCase(addContact.pending, handleAddContactPending)
      .addCase(deleteContact.pending, handleDeleteContactPending)
      .addCase(fetchContacts.fulfilled, handleFetchContactsFulfilled)
      .addCase(addContact.fulfilled, handleAddContactFulfilled)
      .addCase(deleteContact.fulfilled, handleDeleteContactFulfilled)
      .addMatcher(isPendingAction, state => {
        state.error = null;
      })
      .addMatcher(isFulfilledAction, state => {
        turnOffLoaders(state);
      })
      .addMatcher(isRejectedAction, (state, { payload }) => {
        turnOffLoaders(state);
        state.error = payload;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
