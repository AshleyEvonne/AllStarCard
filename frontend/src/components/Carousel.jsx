import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default function Carousel({ items = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
  };

  if (items.length === 0) {
    return <div className="text-center p-4">No items to display</div>;
  }

  return (
    <div className="relative flex justify-center w-6/12 m-auto">
      <div className="overflow-hidden w-96 rounded-lg shadow-2xl">
        <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {items.map((item) => (
            <div key={item.id} className="w-full flex-shrink-0 items-center">
              <img src={item.image} alt={item.name} className="w-full h-64 object-contain bg-white" />
              <div className="bg-gray-200 p-4">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-lg">Current Bid: ${item.currentBid}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={prevSlide} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full">
        <FaAngleLeft size={24} />
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full">
        <FaAngleRight size={24} />
      </button>
    </div>
  );
}