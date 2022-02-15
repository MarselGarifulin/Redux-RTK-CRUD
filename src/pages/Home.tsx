import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useContactsQuery,
  useDeleteContactMutation,
} from '../services/contactsApi';
import '../Layout/Home.css';

const Home = () => {

  const { data, isLoading, error } = useContactsQuery();

  const [deleteContact] = useDeleteContactMutation();

  useEffect(() => {
    if (error) {
      toast.error('Не возможно подключиться');
    }
  }, [error]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  const handleDelete = async (id: string) => {
    if (
      window.confirm('Вы диствительно хотите удалить?')
    ) {
      await deleteContact(id);
      toast.success('Contact Удалён');
    }
  };

  return (
    <div style={{ marginTop: '100px', display: 'grid', placeItems: 'center' }}>
      <Link to='/addContact'>
        <button className='btn btn-add'>Добавить Contact</button>
      </Link>
      <br />
      <br />
      <table className='styled-table'>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No.</th>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>Email</th>
            <th style={{ textAlign: 'center' }}>Contact</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any, index: number) => (
            <tr key={item.id}>
              <th scope='row'>{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.contact}</td>
              <td>
                <Link to={`/editContact/${item.id}`}>
                  <button className='btn btn-edit'>Edit</button>
                </Link>
                <button
                  className='btn btn-delete'
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
                <Link to={`/info/${item.id}`}>
                  <button className='btn btn-view'>Detail</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
