import React, { useState } from 'react';
import { Contact } from '../store/contactSlice';

type ContactItemProps = {
  contact: Contact;
  onDelete: () => void;
  onEdit: (contact: Contact) => void;
};

const ContactItem: React.FC<ContactItemProps> = ({ contact, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);

  const handleEdit = () => {
    onEdit({ ...contact, name, email });
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow flex flex-col sm:flex-row justify-between items-center">
      {isEditing ? (
        <div className="flex-1 mr-4">
          <input
            className="border p-2 mb-2 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border p-2 rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      ) : (
        <div className="flex-1 text-sm sm:text-md">
          <p className="font-bold">{contact.name}</p>
          <p>{contact.email}</p>
        </div>
      )}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-2">
        {isEditing ? (
          <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 hover:ease-in-out"
            onClick={handleEdit}>
            Save
          </button>
        ) : (
          <button
            className="bg-yellow-500 text-white px-3 py-1 rounded  hover:bg-yellow-600 hover:ease-in-out"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}

        {/* Delete button */}
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 hover:ease-in-out"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactItem;
