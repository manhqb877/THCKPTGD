import React, { useState, useEffect } from 'react';
import './App.css';

import BookItem from './assets/components/BookItem';

function App() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('books');
    return savedBooks ? JSON.parse(savedBooks) : [
      { id: 1, name: 'Ali', genre: '12A', year: 18 },
      { id: 2, name: 'Bo', genre: '11B', year: 17 },
      { id: 3, name: 'Mark', genre: '12C', year: 18 },
      { id: 4, name: 'David', genre: '10D', year: 16 },
      { id: 5, name: 'Eve', genre: '11E', year: 17 },
      { id: 6, name: 'Frank', genre: '10A', year: 16 },
      { id: 7, name: 'Grace', genre: '11B', year: 17 },
      { id: 8, name: 'Hannah', genre: '12C', year: 18 },
      { id: 9, name: 'Ian', genre: '10D', year: 16 },
      { id: 10, name: 'Manh', genre: '11E', year: 17 },
    ];
  });

  const [newBook, setNewBook] = useState({ name: '', genre: '', year: '' });
  const [editingBook, setEditingBook] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [genreFilter, setGenreFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleDelete = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const handleAddBook = () => {
    if (newBook.name && newBook.genre && newBook.year) {
      setBooks((prevBooks) => [
        ...prevBooks,
        { id: Date.now(), name: newBook.name, genre: newBook.genre, year: parseInt(newBook.year, 10) },
      ]);
      setNewBook({ name: '', genre: '', year: '' });
    }
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
  };

  const handleSaveEdit = () => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === editingBook.id ? editingBook : book
      )
    );
    setEditingBook(null);
  };

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
    book.genre.toLowerCase().includes(genreFilter.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">Book Management</h1>
      <div className="mb-6 flex flex-col md:flex-row items-center justify-center gap-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Genres</option>
          {[...new Set(books.map((book) => book.genre))].map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newBook.name}
            onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Genre"
            value={newBook.genre}
            onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Year"
            value={newBook.year}
            onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddBook}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Book
          </button>
        </div>
      </div>
      <table className="table-auto w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Genre</th>
            <th className="px-6 py-3">Year</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <BookItem
              key={book.id}
              book={book}
              onDelete={handleDelete}
              onEdit={handleEditBook}
            />
          ))}
        </tbody>
      </table>

      {editingBook && (
        <div className="fixed inset-0 bg-gray-800/35 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-center mb-4">Edit Book</h2>
            <input
              type="text"
              placeholder="Name"
              value={editingBook.name}
              onChange={(e) => setEditingBook({ ...editingBook, name: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Genre"
              value={editingBook.genre}
              onChange={(e) => setEditingBook({ ...editingBook, genre: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Year"
              value={editingBook.year}
              onChange={(e) => setEditingBook({ ...editingBook, year: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={handleSaveEdit}
                className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Save
              </button>
              <button
                onClick={() => setEditingBook(null)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;