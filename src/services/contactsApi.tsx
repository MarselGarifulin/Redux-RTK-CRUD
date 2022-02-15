import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Contact } from '../model/contact.model';


// Подключение API [Connection API]
export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  // Создание CRUD [Creat CRUD]
  tagTypes: ['Contact'],
  endpoints: (builder) => ({
    //Получение всех cotact [GET all Contacts]
    contacts: builder.query<Contact[], void>({
      query: () => '/contacts',
      providesTags: ['Contact'],
    }),
    //Получение contact по id  [GET Contact by id]
    contact: builder.query<Contact, string>({
      query: (id) => `/contacts/${id}`,
      providesTags: ['Contact'],
    }),

    //Добавление contact [addCotact] 
    addContact: builder.mutation<{}, Contact>({
      query: (contact) => ({
        url: '/contacts',
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contact'],
    }),
    //Удаление contact [DELETE CONTACT]
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
    // Изменение contact [Edit contact]
    updateContact: builder.mutation<void, Contact>({
      query: ({ id, ...rest }) => ({
        url: `/contacts/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

//Экспорт всех методов [Экспорт всех методов]
export const {
  useContactsQuery,
  useContactQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactsApi;
