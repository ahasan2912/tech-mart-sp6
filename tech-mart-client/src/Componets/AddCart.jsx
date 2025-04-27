import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const AddCart = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/product/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [id]);

    const { _id, name, price, product: product_name } = product || {};

    const handleAddBtn = (event) => {
        event.preventDefault();
        const form = event.target;
        const quantity = form.category.value;
        const currency = "BDT";
        const productId = _id;
        const price_new = parseInt(price);

        const addProduct = {
            name, product_name, quantity, price_new, currency,productId
        };
        fetch('http://localhost:5000/order', {
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
                }
            })

        //SSLCOMMERZ Payment Gateway
        fetch("http://localhost:5000/ssl-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(addProduct)
        })
        .then(res => res.json())
        .then(result => {
            window.location.replace(result.url);
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
                            <input type="text" defaultValue={name} name='photo' placeholder="Customer Name" className="input input-bordered w-full" required readOnly />
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input type="text" defaultValue={product_name} name='product' placeholder="Product Name" className="input input-bordered" required />
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Product Quantity</span>
                            </label>
                            <input type="text" defaultValue={5} name='category' placeholder="Product Quantity" className="input input-bordered" required readOnly />
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="number" defaultValue={price} name='price' className="input input-bordered" required readOnly />
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Payment</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCart;