import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Product.css';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching product details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>...Loading info about the product...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div clas = "product-details">
      <h2>{product.title}</h2>
      <div className = "product-description">
        <p>{product.description}</p>
        <img src={product.image} alt={product.title} />
      </div>
    </div>
  );
};

export default Product;