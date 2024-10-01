import React from 'react';

export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-yellow-500 rounded-lg shadow-md shadow-black text-gray-700 hover:text-white py-2 px-4 transition duration-300"
    >
      {children}
    </button>
  );
}