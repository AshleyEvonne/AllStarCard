import React, { useContext, useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import BidForm from "./BidForm";

function Details() {
  const { id } = useParams();


const [product, setProduct] = useState([]);

  const fetchProduct = async() =>{
    try{
        const data = await fetch(`http://localhost:8081/api/cards/${id}`)
        const response = await data.json()
        console.log(response)
        setProduct(response)

        
    }catch(e)
    {
      console.error(e)
    }
  }

  useEffect(()=>{
    fetchProduct()
  },[])


  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-700 via-fuchsia-500 to-orange-400 mt-8">
      <div>
    <div className="container mx-auto p-4">
      <button
        className="mb-4 bg-saffron text-onyx px-4 py-2 rounded hover:bg-keppel"
      >
        Back to All Items
      </button>
      <div className="bg-platinum p-6 rounded-lg shadow-md border-solid border-4 border-white">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-64 object-contain mb-4 rounded"
        />
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-keppel font-bold text-xl mb-4">
          ${product.startingPrice}
        </p>
        <BidForm currentPrice={0}/>
    </div></div>
    </div>
    </div>
  );
}


export default Details;