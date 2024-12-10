import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const OrderList = () => {
    const orderData = useLoaderData();
    const [orderList, setOrderList ] = useState(orderData)
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://tech-mart-server-delta.vercel.app/order/${id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Order has been deleted.",
                                icon: "success"
                            });
                        }
                        const reamingData = orderList.filter(data => data._id !== id);
                        setOrderList(reamingData);
                    })
            }
        });

    }
    return (
        <div className='mt-24 max-w-7xl mx-auto'>
            <h1 className='text-5xl text-center font-semibold'>All Order List</h1>
            <div className='mt-6 mb-16'>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-base border'>
                            <th>Serial No</th>
                            <th>Customer Name</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Phone Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderList.map((order, idx) =>
                                <tr key={idx} className="hover border">
                                    <th>{idx + 1}</th>
                                    <td>{order.cName}</td>
                                    <td>{order.product}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.phone}</td>
                                    <td>
                                        <Link>
                                            <button onClick={()=> handleDelete(order._id)} className='btn'>Order Cancle</button>
                                        </Link>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;
