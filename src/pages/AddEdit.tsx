import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Layout/AddEdit.css';
import { toast } from 'react-toastify';
import {
  useAddContactMutation,
  useContactQuery,
  useUpdateContactMutation,
} from '../services/contactsApi';

const initialState = {
  name: '',
  email: '',
  contact: '',
};

const AddEdit = () => {

  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const [addContact] = useAddContactMutation();
  const [updateContact] = useUpdateContactMutation();

  const { name, email, contact } = formValue;
  const navigate = useNavigate();

  const { id } = useParams();
  const { data, error } = useContactQuery(id!);

  useEffect(() => {
    if (error && id) {
      toast.error('Не возможно подключиться');
    }
  }, [error, id]);

  useEffect(() => {
    if (id) {
      setEditMode(true);
      if (data) {

        setFormValue({ ...data });
      }
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id, data]);

  const handleInputChange = (e: any) => {

    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name && !email && !contact) {
      toast.error('Пожалуйста заполните поля');
    } else {
      if (editMode) {
        console.log('formValue=', formValue);
        await updateContact(formValue);
        navigate('/');
        setEditMode(false);
        toast.success('Contact изменён успешно!');
      } else {
        await addContact(formValue);
        navigate('/');
        toast.success('Contact успешно добавился');
      }
    }
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <form
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          alignContent: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          id='name'
          placeholder='Enter Name...'
          value={name}
          onChange={handleInputChange}
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='Enter Email...'
          value={email}
          onChange={handleInputChange}
        />
        <label htmlFor='contact'>Contact</label>
        <input
          type='number'
          name='contact'
          id='contact'
          placeholder='Enter Contact no...'
          value={contact}
          onChange={handleInputChange}
        />
        <input type='submit' value={editMode ? 'Update' : 'Add'} />
      </form>
    </div>
  );
};

export default AddEdit;
