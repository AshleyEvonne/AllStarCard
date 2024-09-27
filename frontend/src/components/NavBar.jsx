import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ALLSTARLOGO from "../assets/ALLSTARLOGO.jpg";
import SearchComponent from "./SearchComponent";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let loginStatus = localStorage.getItem("token");
    setIsLoggedIn(!!loginStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/");
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between p-4 shadow-lg md:px-8 bg-purple-700">
        <Link to="/" className="aboulte top-4 left-4 md:static">
          <img
            src={ALLSTARLOGO}
            alt="Logo"
            className="h-16 md:h-24 rounded-lg cursor-pointer border-solid border-4 border-white"
          />
        </Link>
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            ></path>
          </svg>
        </button>
        <div className={`w-full md:w-auto ${open ? "block" : "hidden"} md:flex md:items-center md:space-x-6 md:mt-0`}>
          <ul className="grid grid-cols-1 md:flex md:items-center md:space-x-6 gap-4 md:gap-0">
            <div className="flex justify-around w-full space-x-3">
              <li className="bg-yellow-500 rounded-lg shadow-md shadow-black">
                <Link
                  to="/"
                  className="block py-2 px-3 text-gray-700 hover:text-white transition duration-300"
                >
                  HOME
                </Link>
              </li>
              <li className="bg-yellow-500 rounded-lg shadow-md shadow-black ">
                <Link
                  to="/products"
                  className="block py-2 px-3 text-gray-700 hover:text-white transition duration-300 focus:ring-black disabled:opacity-50"
                >
                  CARDS
                </Link>
              </li>
              <li className="bg-yellow-500 rounded-lg shadow-md shadow-black">
                <Link
                  to="/BasketBall"
                  className="block py-2 px-3 text-gray-700 hover:text-white transition duration-300"
                >
                  BASKETBALL
                </Link>
              </li>
            </div>
            <div className="flex justify-around w-full space-x-3">
              <li className="bg-yellow-500 rounded-lg shadow-md shadow-black">
                <Link
                  to="/BaseBall"
                  className="block py-2 px-3 text-gray-700 hover:text-white transition duration-300"
                >
                  BASEBALL
                </Link>
              </li>
              <li className="bg-yellow-500 rounded-lg shadow-md shadow-black">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-gray-700 hover:text-white rounded transition duration-300"
                    >
                    LOGOUT
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="block px-4 py-2 text-gray-700 hover:text-white rounded transition duration-300"
                  >
                    LOGIN
                  </button>
                )}
              </li>
              </div>
              </ul>
              <div className="mt-2 md:mt-0 md:ml-6">
                <SearchComponent />
              </div>
            
          
        </div>
      </div>
    </div>
  );
};

export default NavBar;
