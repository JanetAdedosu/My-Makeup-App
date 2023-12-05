import React from "react";
import "./styles.css";

const Wishlist = ({ wishlist, removeFromWishlist }) => {
  const handleRemoveFromWishlist = (item) => {
    removeFromWishlist(item);
  };

  return (
    <div>
      <h2>Wishlist</h2>
      <ul>
        {wishlist.map((product, index) => (
          <li key={index}>
            <div>
              <strong>{product.name}</strong>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              {product.image_link && (
                <img src={product.image_link} alt={product.name} />
              )}
              <button onClick={() => removeFromWishlist(product)} className="wishlist-button remove-button">
                Remove from Wishlist
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
