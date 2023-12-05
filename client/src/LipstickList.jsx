import React, { useEffect, useState } from "react";
import "./styles.css";

const LipstickList = ({ addToWishlist, removeFromWishlist, wishlist }) => {
  const [lipstickList, setLipstickList] = useState([]);
  const [filteredLipstickList, setFilteredLipstickList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLipstickList();
  }, []);

  async function getLipstickList() {
    try {
      const response = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl&product_type=lipstick");
      const data = await response.json();
      console.log(data);
      setLipstickList(data);
      // initially set filtered lists to the same as lipstickList
      setFilteredLipstickList(data);
    } catch (err) {
      setError(err.message);
    }
  }

  const handleAddToWishlist = (lipstick) => {
    addToWishlist(lipstick);
    alert(`Added ${lipstick.name} to Wishlist`);
  };

  const handleFilterByPrice = (minPrice, maxPrice) => {
    // Filter lipstickList based on price range
    const filtered = lipstickList.filter((lipstick) => {
      const price = parseFloat(lipstick.price);
      return price >= minPrice && price <= maxPrice;
    });

    setFilteredLipstickList(filtered);
  };

  return (
    <div>
      <h2>Lipstick Products</h2>
      <div>
        <label>
          Min Price: 
          <input
            type="number"
            onChange={(e) => handleFilterByPrice(parseFloat(e.target.value), Infinity)}
          />
        </label>
        <label>
          Max Price: 
          <input
            type="number"
            onChange={(e) => handleFilterByPrice(0, parseFloat(e.target.value))}
          />
        </label>
      </div>

      <ul>
        {filteredLipstickList.map((lipstick, index) => (
          <li key={index}>
            <div>
              <strong>{lipstick.name}</strong>
              <p>{lipstick.description}</p>
              <p>Price: {lipstick.price}</p>
              {lipstick.image_link && (
                <img src={lipstick.image_link} alt={lipstick.name} />
              )}
            </div>
            {/* Check if wishlist is defined and is an array before calling includes */}
            {Array.isArray(wishlist) && wishlist.includes(lipstick) ? (
              <button
                className="wishlist-button"
                onClick={() => removeFromWishlist(lipstick)}
              >
                <i className="fas fa-heart"></i> Remove from Wishlist
              </button>
            ) : (
              <button
                className="wishlist-button"
                onClick={() => addToWishlist(lipstick)}
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

export default LipstickList;

      