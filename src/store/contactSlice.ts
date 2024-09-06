import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Contact = {
  id: number;
  name: string;
  email: string;
};

interface ContactState {
  contacts: Contact[];
}

const initialState: ContactState = {
  contacts: [],
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    // Reducer to add a new contact
    addContact: (state, action: PayloadAction<Omit<Contact, 'id'>>) => {
      state.contacts.push({ ...action.payload, id: Date.now() });
    },
    // Reducer to delete a contact by id
    deleteContact: (state, action: PayloadAction<number>) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },
    // Reducer to edit an existing contact
    editContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
  },
});

export const { addContact, deleteContact, editContact } = contactSlice.actions;
export default contactSlice.reducer;
