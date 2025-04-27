import React from 'react';
import { useParams } from 'react-router-dom';

const PaymentSuccess = () => {
    const {tranId} = useParams();
    return (
        <div className='flex flex-col justify-center items-center h-[70vh]'>
            <h1 className='text-3xl font-semibold'>Payment Success: {tranId}</h1>
        </div>
    );
};

export default PaymentSuccess;