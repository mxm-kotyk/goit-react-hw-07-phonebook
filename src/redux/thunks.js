import {
  addContactRequest,
  deleteContactRequest,
  fetchContactsRequest,
} from 'services/mockAPI';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const contacts = await fetchContactsRequest();
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contactData, thunkAPI) => {
    try {
      const contact = await addContactRequest(contactData);
      return contact;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const contact = await deleteContactRequest(id);
      return contact;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
