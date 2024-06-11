import { Link } from 'react-router-dom';

const Products = ({ products }) => {
  return (
    <ul className="products">
      {products.map((product) => (
        <li key={product.id} className="products--item">
          <Link to={`/product/${product.id}`}>
            <div className="product">
              <img className="product--image" src={product.image} alt={product.title} />
              <span className="product--title" title={product.title}>{product.title}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Products;