import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';

const UpdateProduct = () => {
    const singleProudct = useLoaderData();
    const { _id, photo, product, category, price, name, email } = singleProudct;
    const { user } = useContext(AuthContext);
    const handleUpdateBtn = (event) => {
        event.preventDefault();
        const form = event.target;
        const photo = form.photo.value;
        const product = form.product.value;
        const category = form.category.value;
        const price = form.price.value;
        /* const name = form.name.value;
        const email = form.email.value; */
        const updateProduct = {
            photo, product, category, price, name, email
        };

        fetch(`https://tech-mart-server-delta.vercel.app/product/${_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateProduct)
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount) {
                Swal.fire({
                    title: 'Updated Scuccess!',
                    text: 'Equipment Updated successfully',
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
                <form onSubmit={handleUpdateBtn} className="card-body">
                    <h1 className='text-5xl font-bold text-center'>Update Product</h1>
                    <div className='flex gap-5'>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Product URL</span>
                            </label>
                            <input type="text" name='photo' placeholder="Photo URL" className="input input-bordered w-full" defaultValue={photo} required />
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input type="text" name='product' placeholder="Product Name" className="input input-bordered" defaultValue={product} required />
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Product Category</span>
                            </label>
                            <input type="text" name='category' placeholder="Product Category" className="input input-bordered" defaultValue={category} required />
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="text" name='price' placeholder="Price" className="input input-bordered" defaultValue={price} required />
                        </div>
                    </div>
                    {/* <div className='flex gap-5'>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">User Name</span>
                            </label>
                            <input type="text" name='name' placeholder="User Name" className="input input-bordered" defaultValue={name} />
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">User Email</span>
                            </label>
                            <input type="email" name='email' placeholder="User Email" className="input input-bordered" defaultValue={email} />
                        </div>
                    </div> */}
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Add Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;