import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProductCard = ({ pro, products, setProducts }) => {
    const { _id, photo, product, category, price } = pro;
    return (
        <div className="border border-[] p-4 rounded-md">
            <img className='w-full h-[250px]' src={photo} alt="" />
            <h1 className='text-2xl font-semibold'>{product}</h1>
            <div className='flex items-center justify-between'>
                <p className='font-bold'>Category: {category}</p>
                <p className='font-bold'>Price: ${price}</p>
            </div>
            <div className='text-center mt-6 space-x-3'>
                <Link to={`/addcart/${_id}`} className='btn bg-[#e02c6d] text-white font-bold w-full'>Order confirm</Link>
            </div>
        </div>
    );
};

export default ProductCard;