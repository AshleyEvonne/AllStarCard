import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-700 via-fuchsia-500 to-orange-400">
      {children}

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">About SportsBid</h3>
              <p>We're passionate about connecting sports card collectors with their dream cards through exciting online auctions.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">FAQ</a></li>
                <li><a href="#" className="hover:underline">Terms of Service</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
              <p className="mb-4">Stay updated with the latest auctions and card releases.</p>
              <input type="email" placeholder="Enter your email" className="w-full p-2 rounded-lg text-gray-800" />
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 SportsBid. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}