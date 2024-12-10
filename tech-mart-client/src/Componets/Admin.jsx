import React, { useState } from 'react';
import AdminCard from './AdminCard';
import { useLoaderData } from 'react-router-dom';

const Admin = () => {
    const dataProducts = useLoaderData();
    const [products, setProducts] = useState(dataProducts);
    return (
        <div className='mt-24'>
            <h1 className='text-5xl font-semibold text-center'>Addmin Pannel</h1>
            <div>
                {
                    <div className='grid gird-col-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto my-10'>
                        {
                            products.map(pro => <AdminCard key={pro._id} pro={pro} products={products} setProducts={setProducts}></AdminCard>)
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default Admin;