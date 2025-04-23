import React from 'react';

function BookItem({ book, onDelete, onEdit }) {
  return (
    <tr className="text-center hover:bg-gray-100">
      <td className="border border-gray-300 px-6 py-3">{book.name}</td>
      <td className="border border-gray-300 px-6 py-3">{book.genre}</td>
      <td className="border border-gray-300 px-6 py-3">{book.year}</td>
      <td className="border border-gray-300 px-6 py-3">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 mr-2"
          onClick={() => onDelete(book.id)}
        >
          Delete
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          onClick={() => onEdit(book)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
}

export default BookItem;