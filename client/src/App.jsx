import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MakeupList from "./MakeupList";
import LipstickList from "./LipstickList";
import Wishlist from "./Wishlist";
import "./App.css";



const App = () => {
  const EMPTY_FORM = {
    budget: "",
    brand: "",
    product: "",
    skinType: "",
    selectedSkinColor: "",
    selectedBrand: '',
  };

  const [input, setInput] = React.useState(EMPTY_FORM);
  const [wishlist, setWishlist] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const removeFromWishlist = (itemToRemove) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item !== itemToRemove)
    );
  };

  const skinColorOptions = [
    "#8B4513", // SaddleBrown
    "#964B00", // Brown
    "#6B4226", // DarkRed
    "#2F4F4F", // DarkSlateGray
    "#FFDAB9", // Peachpuff
    "#FFC0CB", // Pink
    "#FFE4C4", // Bisque
    "#D2B48C", // Tan
    "#F4A460", // SandyBrown
  ];
  const brands = ['Maybelline', 'L\'Oréal', 'MAC', 'CoverGirl', 'Revlon'];

  const skinProducts = ['Blush','Powder','Lipstick','Foundation'];
   
  const budget = ['<10$','>10$','10$']

  const handleSkinColorChange = (color) => {
    setInput((prevInput) => ({ ...prevInput, selectedSkinColor: color }));
  };
  
  const handleBrandChange = (brand) => {
    setInput((prevInput) => ({ ...prevInput, selectedBrand: brand }));
  };
  
  const handleSkinProductsChange = (products) => {
    setInput((prevInput) => ({ ...prevInput, selectedProducts: products }));
  };
  
  const handleBudgetChange = (budget) => {
    setInput((prevInput) => ({ ...prevInput, selectedBudget: budget }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // to display a message
    alert("Product submitted");

    // If i want to do something with the entered data, i can send it to an API or perform other actions here.
    console.log(input);

    // Optionally, i can reset the form after submission
    setInput(EMPTY_FORM);
  };

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => [...prevWishlist, product]);
  };

  
  return (
    <div className="App">
      
         <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/makeup">Makeup List</Link>
            </li>
            <li>
              <Link to="/lipstick">Lipstick List</Link>
            </li>
            <li>
              <Link to="/wishlist">Wishlist ({wishlist.length})</Link>
            </li>
          </ul>
        </nav> 

        <Routes>
          <Route
            path="/"
            element={
              <div>
              <h1>welcome to my Makeup App !</h1>
             <h2>Discover the latest makeup products and create your personalized wishlist.</h2>
             <div>
             <h3>Ready to Explore?</h3>
             {/* <button onClick={() => history.push('/makeup')}>Explore Products</button> */}
             </div>
             
             {/* <div>
             <h2>Quick Links</h2>
             <ul>
             <li><Link to="/makeup">Explore Makeup</Link></li>
             <li><Link to="/lipstick">Explore Lipstick</Link></li>
             <li><Link to="/wishlist">My Wishlist</Link></li>
             {/* Add more links as needed */}
             {/* </ul>
             </div> */} 
             {/* <div className="image-container">
              <img
                  src="/ef46c94c-1e44-4d3b-8e70-61795e2a166c.png"
                  alt="My Image"
              />
              <img
                  src="/jake-peterson-VJ4pn_PSBLo-unsplash.jpg"
                  alt="My Image"
              />
              <img
                  src="/diana-ruseva-1cHnHtuNAcc-unsplash.jpg"
                  alt="My Image"
              />
              </div> */}
                <form onSubmit={(e) => handleSubmit(e)}>
                  <br />
                  <label>
                 Select your Skin Color: 
                 <div className="skin-color-options">
                 {skinColorOptions.map((color, index) => (
                 <div
                key={index}
                className="skin-color-option"
                style={{ backgroundColor: color }}
                onClick={() => handleSkinColorChange(color)}
              ></div>
              ))}
             </div>
              </label>
                  <label>
                    {/* Select Skin Color: */}
                    <input
                      type="color"
                      value={input.selectedSkinColor}
                      placeholder="selectedSkinColor"
                      onChange={(e) => handleChange(e)}
                      className="input-field"
                    />
                  </label>
                  
                <label className="input-field">
                 Select your Skin Color
                <select onChange={(e) => handleSkinColorChange(e.target.value)}>
                <option value="">Select Skin Color</option>
                {skinColorOptions.map((color, index) => (
                <option key={index} value={color}>
                {color}
                 </option>
                ))}
                </select>
                 </label>
                  <label className="input-field">
                   Select Brand
                  <select onChange={(e) => handleBrandChange(e.target.value)}>
                  <option value="">Select Brand</option>
                  {brands.map((brand, index) => (
                  <option key={index} value={brand}>
                  {brand}
                  </option>
                 ))}
                 </select>
                 </label>
                  
                 <label className="input-field">
                 What product would you like?
                <select onChange={(e) => handleSkinProductsChange(e.target.value)}>
                <option value="">Select Skin Product</option>
                {skinProducts.map((color, index) => (
                <option key={index} value={color}>
                {color}
                 </option>
                ))}
                </select>
                </label>
                
                <label className="input-field">
                 Select your Budget
                <select onChange={(e) => handleBudgetChange(e.target.value)}>
                <option value="">Select Budget</option>
                {budget.map((budget, index) => (
                <option key={index} value={budget}>
                {budget}
                 </option>
                ))}
                </select>
                 </label>

                 <div>
                <label>
                Upload Image:
                <input type="file" accept="image/*" onChange={handleImageChange} />
                </label>
                </div>

                  {/* <input
                    onChange={(e) => handleChange(e)}
                    type="text"
                    value={input.budget}
                    name="budget"
                    placeholder="What is your budget?"
                    className="input-field"
                  /> */}

                  {/* <input
                    onChange={(e) => handleChange(e)}
                    type="text"
                    value={input.brand}
                    name="brand"
                    placeholder="What brand do you like?"
                    className="input-field"
                  /> */}

                  {/* <input
                    onChange={(e) => handleChange(e)}
                    type="text"
                    value={input.product}
                    name="product"
                    placeholder="What product are you looking for?"
                    className="input-field"
                  /> */}

                  {/* <input
                    onChange={(e) => handleChange(e)}
                    type="text"
                    value={input.skinType}
                    name="skinType"
                    placeholder="What is your skin type?"
                    className="input-field"
                  /> */}

                  <button type="submit">Enter Product</button>
                </form>
              </div>
            }
          />
          <Route
          path="/wishlist"
          element={<Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} />}
        />
          <Route
            path="/makeup"
            element={<MakeupList addToWishlist={addToWishlist} removeFromWishlist={removeFromWishlist} wishlist={wishlist} />}
          />
          <Route
            path="/makeup"
            element={<MakeupList addToWishlist={(product) => setWishlist([...wishlist, product])} />}
          />
          <Route
            path="/lipstick"
            element={<LipstickList addToWishlist={(product) => setWishlist([...wishlist, product])} />}
          />
          <Route
            path="/wishlist"
            element={
              <div>
                <h2>Wishlist</h2>
                <ul>
                  {wishlist.map((item, index) => (
                    <li key={index}>
                      <div>
                        <strong>{item.name}</strong>
                        <p>{item.description}</p>
                        <p>Price: {item.price}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>         
                }
          />
        </Routes>
    
    </div>
  
  );
};

export default App;
