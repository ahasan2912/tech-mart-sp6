import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Baner from './Baner';
import ProductCard from './ProductCard';

const Home = () => {
    const dataProducts = useLoaderData();
    const [products, setProducts] = useState(dataProducts)
    return (
        <div>
            <Baner></Baner>
            <div className='grid gird-col-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto my-10'>
                {
                    products.map(pro => <ProductCard key={pro._id} pro={pro} products={products} setProducts={setProducts}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default Home;