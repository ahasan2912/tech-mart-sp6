import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';

const AddCart = () => {
    const { user } = useContext(AuthContext);
    const handleAddBtn = (event) => {
        event.preventDefault();
        const form = event.target;
        const cName = form.photo.value;
        const product = form.product.value;
        const quantity = form.category.value;
        const phone = form.price.value;
        const addProduct = {
            cName, product, quantity, phone,
        };
        fetch('https://tech-mart-server-delta.vercel.app/order', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(addProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Order Scuccess!',
                        text: 'Product Order successfully!',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    form.reset();
                }
            })
    }
    return (
        <div className='flex items-center justify-center mt-28 mb-16 max-w-5xl mx-auto shadow-lg'>
            <div className="card bg-base-100 w-full shadow-2xl">
                <form onSubmit={handleAddBtn} className="card-body">
                    <h1 className='text-5xl font-bold text-center'>Add to Cart</h1>
                    <div className='flex gap-5'>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Customar Name</span>
                            </label>
                            <input type="text" name='photo' placeholder="Customer Name" className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input type="text" name='product' placeholder="Product Name" className="input input-bordered" required />
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Product Quantity</span>
                            </label>
                            <input type="text" name='category' placeholder="Product Quantity" className="input input-bordered" required />
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input type="text" name='price' placeholder="Phone Number" className="input input-bordered" required />
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Order Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCart;