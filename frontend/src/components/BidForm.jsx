import React, { useState } from 'react';

const BidForm = ({ currentPrice, onBidPlaced }) => {
  const [bidAmount, setBidAmount] = useState(0);
  const [ cPrice, setCPrice] = useState(currentPrice)

  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
    console.log("Handle bidchange " + e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBid = parseFloat(bidAmount);
    console.log("new bid " + newBid)

    if (newBid > cPrice) {
      // onBidPlaced(newBid);
      setBidAmount(newBid);
      setCPrice(newBid)
      console.log("current price " + cPrice)
    } else {
      alert('Bid must be higher than the current price!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Place Your Bid</h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
        Current Price: ${!isNaN(cPrice) ? cPrice.toFixed(2) : 0}
        </label>
        <input
          type="number"
          value={bidAmount}
          onChange={handleBidChange}
          className="block w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your bid"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 text-gray-700 hover:text-white bg-yellow-500 rounded-lg shadow-md shadow-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
      >
        PLACE BID
      </button>
    </form>
  );
};

export default BidForm;
