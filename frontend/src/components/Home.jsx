import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import Card from './Card';
import Button from './Button';
import Carousel from './Carousel';
import { FaDollarSign, FaRegClock, FaRegStar } from 'react-icons/fa';
import LBJrook from "../assets/basketball/LBJRookieC-1.jpg"
import Mike1 from "../assets/baseball/Mike-1.jpg"
import Melo from "../assets/basketball/CarmeloRookie.jpg"

const featuredCards = [
  { id: 1, name: "Lebron James Rookie Card", image: LBJrook, currentBid: 100 },
  { id: 2, name: "Mike Trout Autographed Card", image:Mike1, currentBid: 100 },
  { id: 3, name: "Carmelo Anthony Rookie Card", image: Melo, currentBid: 100 },
];


export default function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signup');
  };

  return (
    <Layout>
      <main className="container mx-auto mt-8 px-4 pt-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Featured Cards</h2>
          <Carousel items={featuredCards} />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <div className="flex flex-col items-center p-6">
                <FaRegStar className="w-12 h-12 mb-4 text-blue-500" />
                <h3 className="text-xl font-semibold mb-2">Find Your Card</h3>
                <p className="text-center">Browse our extensive collection of rare and valuable sports cards.</p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col items-center p-6">
                <FaDollarSign className="w-12 h-12 mb-4 text-green-500" />
                <h3 className="text-xl font-semibold mb-2">Place Your Bid</h3>
                <p className="text-center">Bid on your favorite cards in our exciting online auctions.</p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col items-center p-6">
                <FaRegClock className="w-12 h-12 mb-4 text-red-500" />
                <h3 className="text-xl font-semibold mb-2">Win & Collect</h3>
                <p className="text-center">Win the auction and add the card to your prized collection.</p>
              </div>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Bidding?</h2>
            <p className="mb-6">Join thousands of collectors and start building your dream sports card collection today!</p>
            <Button onClick={handleClick}>Sign Up Now</Button>
          </div>
        </section>
      </main>
    </Layout>
  );
}