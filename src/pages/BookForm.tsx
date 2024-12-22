import React, { useState, useEffect } from 'react';
import { addBook, updateBook } from './../utils/indexedDB'; // IndexedDB utilities file
import { useNavigate } from 'react-router-dom';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();
    const formTitle=sessionStorage.getItem('formTitle')
    const storedBook = JSON.parse(sessionStorage.getItem('bookToEdit')??'{}');

  useEffect(() => {
    if (formTitle==='Update Book'||formTitle==='View Book') {
      setTitle(storedBook.title);
      setAuthor(storedBook.author);
    }

  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formTitle==='Update Book') {
      await updateBook({ id: storedBook.id, title, author });
      alert('Book updated successfully!');
    } else {
      // Adding new book
      await addBook({ title, author });
      alert('Book added successfully!');
    }
    sessionStorage.removeItem('bookToEdit');

    navigate('/BookShelf');
  };

  return (
    <div>
      <h1>{formTitle}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {formTitle==='Update Book' ? 'Update Book' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
