import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import Details from "./components/Details";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Basketball from "./components/Basketball";
import Baseball from "./components/Baseball";
import Layout from "./components/Layout";
import UserBid from "./components/UserBid";

function App() {
  return (

    <>
    
    
    <NavBar/>
    
        <Routes>
          
          <Route path="/cards" element={<Products/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/BasketBall" element={<Basketball />}/>
          <Route path="/BaseBall" element={<Baseball/>}/>
          <Route path="/Details/:id" element={<Details/>}/>
          <Route path="/Bids" element={<UserBid />} />
          </Routes>
       {/* <Layout/> */}
    </>
  );
}

export default App;
