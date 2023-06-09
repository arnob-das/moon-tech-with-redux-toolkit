import React from "react";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { toggle, toggleBrands } from "../../features/filter/filterSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";

const Home = () => {
  const dispatch = useDispatch();
  const stock = useSelector(state => state.filter.stock);
  const keyword = useSelector(state => state.filter.keywords);
  const brands = useSelector(state => state.filter.brands);

  // const { data, isError, isLoading, isSuccess, error } = useGetProductsQuery(null, { refetchOnMountOrArgChange: true });
  // refetching is handled by invalided tags in productApiSlice
  const { data, isError, isLoading, isSuccess, error } = useGetProductsQuery();

  const products = data?.data;

  console.log(error?.data);

  let content;

  if (isLoading) {
    content = <h1>Loading...</h1>;
  }

  if (isError) {
    content = <h1>{error?.error}</h1>;
  }

  // if products exist
  if (isSuccess && products.length) {
    content = products.map((product) => (
      <ProductCard key={product.model} product={product} />
    ))
  }


  if ((isSuccess && products.length) && (stock || brands.length || keyword)) {
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

export default Home;
