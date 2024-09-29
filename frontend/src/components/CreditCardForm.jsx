import { useState } from "react";
import React from 'react'
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";


function CreditCardForm() {
    const [state, setState] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        focus: "",
    });
    const handleInputChange = (e) => {
      const{name, value} = e.target;
      setState((prev) => ({...prev,[name]: value}));
    };
    const handleInputFocus = (e) => {
        setState((prev) => ({...prev, focus: e.target.name}));
    };

  return (
    <div className="flex items-center justify-center m h-3/12 w-3/12 m-auto mt-40 bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg">
        <Cards
        number={state.number}
        name={state.name} 
        expiry={state.expiry}
        cvc={state.cvc}
        focused={state.focus}
        />
        <div className="mt-3">
            <form>
                <div className="mb-3">
                    <input
                    type="number"
                    name="number"
                    className="form-control"
                    placeholder="Card Number"
                    value={state.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    required
                    />
                </div>
                <div className="mb-3">
                    <input
                    type="text"
                    name="name"
                    className="form-control mb-3"
                    placeholder="Name"
                    value={state.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    required
                    />
                    </div>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <input
                            type="number"
                            name="expiry"
                            className="form-control"
                            placeholder="Valid Thru"
                            pattern="\d\d/\d\d"
                            value={state.expiry}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            required
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                            type="number"
                            name="cvc"
                            className="form-control"
                            placeholder="CVC"
                            pattern="\d{3,4}"
                            value={state.cvc}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            required
                            />
                        </div>
                    </div>
                    <div className="d-grid">
                        <button className="text-gray-700 bg-yellow-500 rounded-md shadow-md shadow-black mb-3">CONFIRM
                        </button>
                </div>
            </form>
            </div>
        </div>
    </div>
  );
}

export default CreditCardForm;