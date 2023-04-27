import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { toggle, toggleBrands } from "../../features/filter/filterSlice";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

const TopRated = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.data.filter(product => product.rating > 3)));
  }, []);

  const dispatch = useDispatch();
  const stock = useSelector(state => state.filter.stock);
  const keyword = useSelector(state => state.filter.keywords);
  const brands = useSelector(state => state.filter.brands);

  let content;

  // if products exist
  if (products.length) {
    content = products.map((product) => (
      <ProductCard key={product.model} product={product} />
    ))
  }

  if (products.length && (stock || brands.length || keyword)) {
    content = products
      .filter((product) => {
        if (stock) {
          return product.status === true
        }
        return product;
      })
      .filter(product => {
        if (brands.length) {
          return brands.includes(product.brand)
        }
        return product;
      })
      .filter(product => {
        if (keyword) {
          return (
            product.model.toLowerCase().includes(keyword.toLowerCase())
          )
        }
        return product;
      })
      .map((product) => (
        <ProductCard key={product._id} product={product} />
      ))
  }

  const activeClass = "text-white  bg-indigo-500 border-white";

  return (
    <div className='max-w-7xl gap-14 mx-auto my-10'>
      <div className='mb-10 flex justify-end gap-5'>
        <button
          className={`border px-3 py-2 rounded-full font-semibold ${stock ? activeClass : null} `}
          onClick={() => { dispatch(toggle()) }}
        >
          In Stock
        </button>
        <button
          className={`border px-3 py-2 rounded-full font-semibold ${brands.includes("amd") ? activeClass : null}`}
          onClick={() => { dispatch(toggleBrands("amd")) }}
        >
          AMD
        </button>
        <button
          className={`border px-3 py-2 rounded-full font-semibold ${brands.includes("intel") ? activeClass : null}`}
          onClick={() => { dispatch(toggleBrands("intel")) }}
        >
          Intel
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14'>
        {content}
      </div>
    </div>
  );
};

export default TopRated;
