import React from "react";
import "./NewArrivals.css";
import { getNewArrivals } from "../../../api/productService";
import { useState, useEffect } from "react";
import ProductCard from "../../../components/ProductCard";
import Spinner from "../../../components/spinner/Spinner";

function NewArrivals() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNewArrivals();
        setProducts(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };
    fetchData();
  }, []);

  return (
   <div className="new-arrivals">
  <h1>New Arrivals</h1>

  {loading ? (
    <div className="spinner-container">
      <Spinner size="32px" color="#721c24" />
    </div>
  ) : (
    <div className="product-grid-newArrive">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )}
</div>

  );
}

export default NewArrivals;
