import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const handleAddBtn = (event) => {
        event.preventDefault();
        const form = event.target;
        const photo = form.photo.value;
        const product = form.product.value;
        const category = form.category.value;
        const price = form.price.value;
        const name = form.name.value;
        const email = form.email.value;
        const addProduct = {
            photo, product, category, price, name, email
        };
        fetch('https://tech-mart-server-delta.vercel.app/product', {
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
                        title: 'Added Scuccess!',
                        text: 'Product added successfully!',
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
                    <h1 className='text-5xl font-bold text-center'>Add Product</h1>
                    <div className='flex gap-5'>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Product URL</span>
                            </label>
                            <input type="text" name='photo' placeholder="Photo URL" className="input input-bordered w-full" required />
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
                                <span className="label-text">Product Category</span>
                            </label>
                            <input type="text" name='category' placeholder="Product Category" className="input input-bordered" required />
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="text" name='price' placeholder="Price" className="input input-bordered" required />
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">User Name</span>
                            </label>
                            <input type="text" name='name' placeholder="User Name" className="input input-bordered" defaultValue={user?.displayName} />
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">User Email</span>
                            </label>
                            <input type="email" name='email' placeholder="User Email" className="input input-bordered" defaultValue={user?.email} />
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Add Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;

