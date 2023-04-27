import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard';
import { toggle, toggleBrands } from '../../features/filter/filterSlice';

const WishList = () => {
    const dispatch = useDispatch();

    const wishListedProducts = useSelector(state => state.wishList.wishListedProducts);
    let content;
    const stock = useSelector(state => state.filter.stock);
    const keyword = useSelector(state => state.filter.keywords);
    const brands = useSelector(state => state.filter.brands);


    if (wishListedProducts.length) {
        content = wishListedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
        ))
    }

    if (wishListedProducts.length && (stock || brands.length || keyword)) {
        content = wishListedProducts
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

export default WishList;