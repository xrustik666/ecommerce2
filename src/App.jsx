import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Categories from './Categories';
import Products from './Products';
import Product from './Product';

import './App.css';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [errorCategories, setErrorCategories] = useState(null);
  const [errorProducts, setErrorProducts] = useState(null);

  // Download categories by API
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
        setLoadingCategories(false);
      })
      .catch(error => {
        setErrorCategories('Error fetching categories');
        setLoadingCategories(false);
      });
  }, []);

  // Download products by API (based on a category that someone chooses)
  useEffect(() => {
    setLoadingProducts(true);
    const url = selectedCategory 
      ? `https://fakestoreapi.com/products/category/${selectedCategory}`
      : 'https://fakestoreapi.com/products';

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoadingProducts(false);
      })
      .catch(error => {
        setErrorProducts('Error fetching products');
        setLoadingProducts(false);
      });
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={
            <>
              <h1>Products</h1>
              {loadingCategories ? (
                <p>Loading categories...</p>
              ) : errorCategories ? (
                <p>{errorCategories}</p>
              ) : (
                <Categories
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryClick={handleCategoryClick}
                />
              )}
              {loadingProducts ? (
                <p>Loading products...</p>
              ) : errorProducts ? (
                <p>{errorProducts}</p>
              ) : (
                <Products products={products} />
              )}
            </>
          } />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;