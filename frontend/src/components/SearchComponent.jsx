import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const SearchComponent = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/cards/all'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItems(data); // Assuming the response is an array
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter items based on search query
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemClick = (id) => {
    const currentPath = location.pathname;
    const newPath = `/Details/${id}`;
    if (currentPath === newPath) {
      navigate(newPath, { replace: true });
    } else {
      navigate(newPath);
    }
    setSearchQuery('');
    window.location.reload();
  };

  return (
    <div className="relative text-gray-600 bg-white rounded-lg">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-full md:w-64"
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : searchQuery && filteredItems.length > 0 ? (
        <ul className="absolute bg-white shadow-md rounded-lg mt-2 w-full md:w-64 z-10">
          {filteredItems.map(item => (
            <li
              key={item.id}
              className="p-2 border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => handleItemClick(item.id)}
              
              
            >
              {item.name}
            </li>
          ))}
        </ul>
      ) : searchQuery ? (
        <p className="p-2">No items found</p>
      ) : null}
    </div>
  );
};

export default SearchComponent;