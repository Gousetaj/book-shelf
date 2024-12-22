import React, { useState, useEffect } from 'react';
import { addBook, updateBook } from './../utils/indexedDB'; // IndexedDB utilities file
import { useNavigate } from 'react-router-dom';
import Popup from './Popup'; // Import the Popup component

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const formTitle = sessionStorage.getItem('formTitle');
  const storedBook = JSON.parse(sessionStorage.getItem('bookToEdit') ?? '{}');

  useEffect(() => {
    if (formTitle === 'Update Book' || formTitle === 'View Book') {
      setTitle(storedBook.title);
      setAuthor(storedBook.author);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formTitle === 'Update Book') {
      await updateBook({ id: storedBook.id, title, author });
      setModalMessage('Book updated successfully!');
    } else {
      await addBook({ title, author });
      setModalMessage('Book added successfully!');
    }

    setIsModalVisible(true);
    sessionStorage.removeItem('bookToEdit');
  };

  const closeModalAndNavigate = () => {
    setIsModalVisible(false);
    navigate('/BookShelf');
  };

  return (
    <div className="main-div">
      <h1>{formTitle}</h1>
      <form onSubmit={handleSubmit}>
        <div className="sub-div">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="sub-div">
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="button-div">
          <button type="submit">
            {formTitle === 'Update Book' ? 'Update Book' : 'Add Book'}
          </button>
          <button type="button" onClick={() => navigate('/BookShelf')}>
            Cancel
          </button>
        </div>
      </form>

      {isModalVisible && (
        <Popup message={modalMessage} onClose={closeModalAndNavigate} />
      )}
    </div>
  );
};

export default BookForm;
