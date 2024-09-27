import React from 'react';

export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-200 text-blue-600 hover:bg-blue-100 font-bold py-2 px-4 rounded transition duration-300"
    >
      {children}
    </button>
  );
}