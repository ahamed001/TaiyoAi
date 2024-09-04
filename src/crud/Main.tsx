import { useState } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import { Contact } from '../store/contactSlice';

// Define the type for a contact
// type Contact = {
//     id: number;
//     name: string;
//     email: string;
// };

const Main = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);

    const addContact = (contact: Omit<Contact, 'id'>) => {
        setContacts([...contacts, { ...contact, id: Date.now() }]);
      };

    const deleteContact = (id: number) => {
        setContacts(contacts.filter(contact => contact.id !== id));
    };

    const editContact = (updatedContact: Contact) => {
        setContacts(
            contacts.map(contact => (contact.id === updatedContact.id ? updatedContact : contact))
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-4">Contact Management App</h1>
            <ContactForm onAddContact={addContact} />
            <ContactList contacts={contacts} onDeleteContact={deleteContact} onEditContact={editContact} />       
        </div>
    );
};

export default Main;
