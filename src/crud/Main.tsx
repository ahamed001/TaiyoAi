import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import { Contact } from '../store/contactSlice';

const Main = () => {
    
    const [contacts, setContacts] = useState<Contact[]>(() => {
        const savedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        return savedContacts;
    });

    // Save contacts to localStorage
    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    // Function to add a new contact
    const addContact = (contact: Omit<Contact, 'id'>) => {
        setContacts([...contacts, { ...contact, id: Date.now() }]);
    };

    // Function to delete a contact
    const deleteContact = (id: number) => {
        setContacts(contacts.filter(contact => contact.id !== id));
    };

    // Function to edit contact
    const editContact = (updatedContact: Contact) => {
        setContacts(
            contacts.map(contact => (contact.id === updatedContact.id ? updatedContact : contact))
        );
    };

    // Function to delete all contacts
    const deleteAllContacts = () => {
        setContacts([]); 
        localStorage.removeItem('contacts');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-4">Contact Form</h1>
            <ContactForm onAddContact={addContact} />
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Contacts List</h2>
                {contacts.length > 0 && (
                    <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 hover:ease-in-out"
                        onClick={deleteAllContacts}
                    >
                        Delete All
                    </button>
                )}
            </div>
            <ContactList
                contacts={contacts}
                onDeleteContact={deleteContact}
                onEditContact={editContact}
            />
        </div>
    );
};

export default Main;
