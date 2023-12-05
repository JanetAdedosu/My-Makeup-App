import React, { useEffect, useState } from "react";
import "./styles.css";

const MakeupList = ({ addToWishlist, removeFromWishlist, wishlist }) => {
  const [makeupLists, setMakeupLists] = useState([]);
  const [filteredMakeupLists, setFilteredMakeupLists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLists();
  }, []);

  async function getLists() {
    try {
      const response = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline");
      const data = await response.json();
      setMakeupLists(data);
      //it ll initially set filtered lists to the same as my makeuplists
      setFilteredMakeupLists(data);  
    } catch (err) {
      setError(err.message);
    }
  }

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    alert(`Added ${product.name} to Wishlist`);
  };
  
  const handleFilterByPrice = (minPrice, maxPrice) => {
    // Filter makeupLists based on price range
    const filtered = makeupLists.filter((product) => {
      const price = parseFloat(product.price);
      return price >= minPrice && price <= maxPrice;
    });

    setFilteredMakeupLists(filtered);
  };

  return (
    <div>
      <h2>Makeup Products</h2>
      <div>
        <label>
          Min Price:10$
          <input
            type="number"
            onChange={(e) => handleFilterByPrice(parseFloat(e.target.value), Infinity)}
          />
        </label>
        <label>
          Max Price:20$
          <input
            type="number"
            onChange={(e) => handleFilterByPrice(0, parseFloat(e.target.value))}
          />
        </label>
      </div>

      <ul>
        {filteredMakeupLists.map((product, index) => (
          <li key={index}>
            <div>
              <strong>{product.name}</strong>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              {product.image_link && (
                <img src={product.image_link} alt={product.name} />
              )}
            </div>
            {wishlist.includes(product) ? (
              <button
                className="wishlist-button"
                onClick={() => removeFromWishlist(product)}
              >
                <i className="fas fa-heart"></i> Remove from Wishlist
              </button>
            ) : (
            <button
              className="wishlist-button"
              onClick={() => addToWishlist(product)}
            >
              <i className="fas fa-heart"></i> Add to Wishlist
            </button>
            )}
            </li>
        ))}
      </ul>
    </div>
  );
};

export default MakeupList;    
        // without using  the filtered list
        {/* <ul>
        {makeupLists.map((product, index) => (
          <li key={index}>
            <div>
              <strong>{product.name}</strong>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              {product.image_link && (
                <img src={product.image_link} alt={product.name} />
              )}
            </div>
            {wishlist.includes(product) ? (
              <button
                className="wishlist-button"
                onClick={() => removeFromWishlist(product)}
              >
                <i className="fas fa-heart"></i> Remove from Wishlist
              </button>
            ) : (
              <button
                className="wishlist-button"
                onClick={() => handleAddToWishlist(product)}
              >
                <i className="fas fa-heart"></i>Add to Wishlist
              </button>
            )}
          </li>
        ))} */}
      {/* </ul>
    </div> */}
  {/* );
}; */}

// export default MakeupList;
