import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const Baseball = () => {

    const [productsList, setProducts] = useState([])
  
      const fetchProducts = async() =>{
        try{
            const data = await fetch("http://localhost:8081/api/cards/all");
            const response = await data.json()
            console.log(response)
            setProducts(response)
  
            
        }catch(e)
        {
          console.error(e)
        }
      }
  
      useEffect(()=>{
        fetchProducts()
      },[])

      const navigate = useNavigate();

      const handleItemClick = (id) => {
        navigate(`/item/${id}`);
      };
  
      
      // More products...
    
      return (
        <div className="min-h-screen bg-gradient-to-b from-purple-700 via-fuchsia-500 to-orange-400 mt-8">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>
    
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {console.log(productsList)}
              {productsList.filter(product => product.type === "BaseBall").map((product) => (
                <div key={product.id} className="text-center"> 
                   <Link to={`/Details/${product.id}`}> 
               <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-transparent xl:aspect-h-8 xl:aspect-w-7"  onClick={() => handleItemClick(product.id)}>
                  <img
                    src={product.imageUrl}
                    className="h-full w-full object-contain object-center group-hover:opacity-75 bg-transparent"
                  />
                </div>
                </Link>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <h3 className="mt-4 text-sm text-gray-700">{product.description}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">{product.startingPrice}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  
    export default Baseball;