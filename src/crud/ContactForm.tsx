import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../store/contactSlice';

type ContactFormProps = {
  onAddContact: (contact: { name: string; email: string }) => void;
};

const ContactForm: React.FC<ContactFormProps> = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddContact({ name, email });
    dispatch(addContact({ name, email }));
    setName('');
    setEmail('');
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <div className="flex flex-col mb-2">
        <label className="mb-1 font-medium">Name</label>
        <input
          type="text"
          className="p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col mb-2">
        <label className="mb-1 font-medium">Email</label>
        <input
          type="email"
          className="p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-3 hover:bg-blue-600 hover:ease-in-out">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
