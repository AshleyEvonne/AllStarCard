import React, { useContext, useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import BidForm from "./BidForm";

function Details() {
  const { id } = useParams();

  const navigate = useNavigate();

   const handleBackClick = () => {
    window.history.back(); // Navigate to the previous route
  };


const [product, setProduct] = useState([]);
const [bid, setBid] = useState([]);

  const fetchProduct = async() =>{
    try{
        const data = await fetch(`http://localhost:8081/api/cards/${id}`)
        const response = await data.json()
        setProduct(response)

    }catch(e)
    {
      console.error(e)
    }
  }
  const fetchProductBid = async () => {
    try {
      const data = await fetch(`http://localhost:8081/api/bid/card/${id}`);
      const response = await data.json();
      console.log(response);
      setBid(response);
      if (bid) {
        console.log("bid found");
      } else {
        console.log("Bid not found");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(()=>{
    fetchProduct();
    fetchProductBid();
  },[])


  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-700 via-fuchsia-500 to-orange-400 mt-8">
      <div>
    <div className="container mx-auto p-4">
      <button
            className="bg-yellow-500 rounded-lg shadow-md shadow-black mb-4 bg-saffron text-onyx px-4 py-2 hover:text-white ml-4"
            onClick={() => navigate("/cards")}
          >
            BACK
          </button>
      <div className="bg-platinum p-6 rounded-lg shadow-md border-solid border-4 border-white">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-96 object-contain mb-4 rounded"
        />
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-keppel font-bold text-xl mb-4">
         Starting Price: ${product.startingPrice}
        </p>

        {bid ? (
              <BidForm
                currentPrice={product.startingPrice}
                cardId={id}
                currentBidAmount={bid.amount}
              />
            ) : (
              <BidForm currentPrice={product.startingPrice} cardId={id} />
            )}
    </div>
    </div>
    </div>
    </div>
  );
}


export default Details;