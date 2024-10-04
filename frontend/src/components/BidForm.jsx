import React, { useState } from "react";
import {Bounce, toast} from 'react-toastify';
import CountdownTimer from "./CountdownTimer";


const BidForm = ({ currentPrice, cardId, currentBidAmount }) => {
  const [bidAmount, setBidAmount] = useState(0);

  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const newBid = bidAmount;
    if (newBid > currentPrice) {
      setBidAmount(newBid);
      try {
        const data = await fetch(
          `http://localhost:8081/api/cards/addBid/${userId}/${cardId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: Number(bidAmount),
            }),
          }
        );
        const response = await data.json();
        localStorage.setItem("bidSuccess", "true");
        window.location.reload();
    
      } catch (e) {
        console.error(e);
      }
    } else {
      toast.error("Bid must be higher than the current price!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
    }
  };
  React.useEffect(() => {
    if (localStorage.getItem("bidSuccess") === "true") {
      toast.success("Bid successful. You have the highest bid", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
  
      // Clear the flag
      localStorage.removeItem("bidSuccess");
    }
  }, []);


  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Place Your Bid</h2>
      <CountdownTimer/>
      <div className="mb-4">
        {currentBidAmount > 0 ? (
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Current Price: {currentBidAmount}$
          </label>
        ) : (
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Current Price: {currentPrice}$
          </label>
        )}

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