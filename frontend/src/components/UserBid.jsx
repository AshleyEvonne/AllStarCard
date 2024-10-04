import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreditCardForm from "./CreditCardForm";

function UserBid() {
  const [userBids, setUserBids] = useState([]);
  const [bidAmounts, setBidAmount] = useState([]);
  const userId = localStorage.getItem("userId");
  const name = localStorage.getItem("name");
  console.log(userId);
  const fetchUserBids = async () => {
    try {
      const data = await fetch(
        `http://localhost:8081/api/users/${userId}/bids/cards`
      );
      const response = await data.json();
      setUserBids(response);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchBidAmounts = async () => {
    try {
      const data = await fetch(`http://localhost:8081/api/bid/user/${userId}`);
      const response = await data.json();
      setBidAmount(response);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchUserBids();
    fetchBidAmounts();
  }, []);
  return (
    
    <div className="min-h-screen bg-gradient-to-b from-purple-700 via-fuchsia-500 to-orange-400 mt-8">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {userBids.length === 0 ? (
            <p>No Bids Placed</p>
          ) : (
            <>
              {userBids.map((bid, i) => (
                <div key={bid.id} className="text-center">
                  <Link to={`/Details/${bid.id}`}>
                    <div
                      className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-transparent xl:aspect-h-8 xl:aspect-w-7"
                      onClick={() => handleItemClick(bid.id)}
                    >
                      <img
                        src={bid.imageUrl}
                        className="h-full w-full object-contain object-center group-hover:opacity-75 bg-transparent"
                      />
                    </div>
                  </Link>
                  <h3 className="mt-4 text-sm text-gray-700">{bid.name}</h3>
                  <h3 className="mt-4 text-sm text-gray-700">
                    {bid.description}
                  </h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    Your Bid is ${bidAmounts[i].amount}
                  </p>
                  
                </div>
              ))}
            </>
          )}
        </div>
        <CreditCardForm />
      </div>
      
    </div>
  );
}

export default UserBid;