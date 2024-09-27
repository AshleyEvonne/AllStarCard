import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const registerUser = async(userData) =>{
        console.log(userData)
        try{
            const data = await fetch("http://localhost:8081/api/users/signup", {
                method:"POST",
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            const response = await data.text()
            if ( response === "granted"){
                localStorage.setItem("token", response)
            
                navigate("/")
                window.location.reload();
            } else {
               alert(response)
            }
        }catch(e)
        {
          console.error(e)
        }
      }



    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here (e.g., API call)
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);

        if(e.target["password"].value != e.target["confirmPassword"].value){
            console.log(e.target["password"]);
            console.log(e.target["confirmPassword"]);
            alert("Password does not match")
        } else {
            registerUser({
                name : name,
                email: email,
                password: password
            })
           
        }
    };
    

    return (
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gradient-to-b from-purple-700 via-fuchsia-500 to-orange-400">
            <div>
                <a href="/">
                    <h3 className="text-4xl font-bold text-gray-300 underline decoration-purple-400 decoration-2px decoration-double">
                        SIGN UP
                    </h3>
                </a>
            </div>
            <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-gray-200 bg-opacity-50 shadow-md sm:max-w-md sm:rounded-lg hover:bg-opacity-40">
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-uppercase transition duration-150 ease-in-out text-gray-700 hover:text-white bg-yellow-500 rounded-lg shadow-md shadow-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
                            >
                            SIGN UP
                        </button>
                    </div>
                </form>
                <a className="underline text-white hover:cursor-pointer" onClick={() => navigate('/login')}>
                    Already have an account?
                </a>
            </div>
        </div>
    );
};

export default Signup;
