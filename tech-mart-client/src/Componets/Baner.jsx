import React from 'react';
import main_Camera from '../assets/main-camera.png'
const Baner = () => {
    return (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between mt-32 px-4">
            <div className=' lg:w-[582px] flex flex-col items-center lg:items-start gap-5 lg:gap-7'>
                <h1 className='text-6xl font-bold text-gray-700'>Start your Journey as Influencer</h1>
                <p className='text-gray-700 font-semibold text-lg'>Begin our journey as an influencer and turn your passion into a thriving career. Share our unique voice, connect with our audience, and collaborate with top brands to make an impact.</p>
                <button className="btn bg-[#E02C6D] text-white text-base rounded-3xl mb-6 lg:mb-0">Preebook Now</button>
            </div>
            <div className='border rounded-full p-6'>
                <div className='bg-[#F3F1EE] rounded-full p-2'>
                    <img src={main_Camera} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Baner;