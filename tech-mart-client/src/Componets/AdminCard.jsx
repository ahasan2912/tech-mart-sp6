import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminCard = ({ pro, products, setProducts }) => {
    const { _id, photo, product, category, price } = pro;
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/product/${id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your equipment has been deleted.",
                                icon: "success"
                            });
                        }
                        const reamingData = products.filter(data => data._id !== id);
                        setProducts(reamingData);
                    })
            }
        });

    }
    return (
        <div className="border border-[] p-4 rounded-md">
            <img className='w-full h-[250px]' src={photo} alt="" />
            <h1 className='text-2xl font-semibold'>{product}</h1>
            <div className='flex items-center justify-between'>
                <p className='font-bold'>Category: {category}</p>
                <p className='font-bold'>Price: ${price}</p>
            </div>
            <div className='text-center mt-6 space-x-3'>
                <Link to="/addproduct" className='btn bg-[#e02c6d] text-white font-bold'>Add Product</Link>
                <Link onClick={() => handleDelete(_id)} className='btn bg-[#e02c6d] text-white font-bold'>Delete</Link>
                <Link to={`/update/${_id}`} className='btn bg-[#e02c6d] text-white font-bold'>Update</Link>
            </div>
        </div>
    );
};

export default AdminCard;