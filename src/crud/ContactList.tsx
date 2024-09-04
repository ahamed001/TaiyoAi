import React from 'react';
import { Contact } from '../store/contactSlice';
import ContactItem from './ContactItem';

interface ContactListProps {
  contacts: Contact[];
  onDeleteContact: (id: number) => void;
  onEditContact: (contact: Contact) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onDeleteContact, onEditContact }) => {
  return (
    <div>
      {contacts.map(contact => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onDelete={() => onDeleteContact(contact.id)}
          onEdit={onEditContact}
        />
      ))}
    </div>
  );
};

export default ContactList;