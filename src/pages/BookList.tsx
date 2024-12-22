import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBooks, deleteBook } from './../utils/indexedDB'; // IndexedDB utilities file

const BookList = () => {
  const [books, setBooks] = useState<{ id: number; title: string; author: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const allBooks = await getAllBooks();
      setBooks(allBooks);
    };
    fetchBooks();
  }, []);

  const handleEdit = (book: { id: number; title: string; author: string }) => {
    sessionStorage.setItem('bookToEdit', JSON.stringify(book));
    sessionStorage.setItem('formTitle','Update Book')
    navigate('/BookForm');
  };
  

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      await deleteBook(id);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      alert('Book deleted successfully!');
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ margin: '10px' }}>
      <h1>Books List</h1>
      <div style={{ margin: '10px 0' }}>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px',
            width: '100%',
            maxWidth: '300px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button onClick={() => {
            sessionStorage.setItem('formTitle','Add Book')
            sessionStorage.setItem('bookToEdit', JSON.stringify({}));
            navigate('/BookForm')}} style={{ margin: '10px' }}>
          Add Book
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button onClick={() => handleEdit(book)}>Edit</button>
                <button onClick={() => handleDelete(book.id)} style={{ marginLeft: '5px' }}>
                  Delete
                </button>
                <button
                  onClick={() => alert(`Viewing book: ${book.title} by ${book.author}`)}
                  style={{ marginLeft: '5px' }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
