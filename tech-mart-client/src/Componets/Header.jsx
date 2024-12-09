import React, { useContext, useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
const Header = () => {
    const [open, setOpen] = useState(false);
    const {user,handleLogOut} = useContext(AuthContext);
    return (
        <div className="bg-[#e4dcdc] w-full fixed top-0 z-50">
            <nav className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4">
                <div onClick={() => setOpen(!open)} className=" md:hidden text-3xl font-extrabold text-gray-800">
                    {
                        open ? <AiOutlineClose /> : <AiOutlineMenu />
                    }
                </div>
                <h1 className="text-4xl font-bold text-gray-700">TechMart</h1>
                <ul className={`absolute md:static bg-black text-white md:text-gray-700 md:bg-[#e4dcdc] md:duration-0 md:flex items-center font-bold text-lg md:gap-2 w-52 md:w-auto md:h-0 duration-1000 top-[92px] h-screen ${open ? "left-0" : "-left-96"}`}>
                    <li className="py-6 px-6 mt-10 md:mt-0"><NavLink to="/">Home</NavLink></li>
                    <li className="py-6 px-6"><NavLink to="/addproduct">Add Products</NavLink></li>
                    <li className="py-6 px-6"><NavLink to="/register">Register</NavLink></li>
                    <div>
                        {
                            user ? <li onClick={handleLogOut} className="py-6 px-6"><NavLink to="/login">LogOut</NavLink></li> : <li className="py-6 px-6"><NavLink to="/login">LogIn</NavLink></li>
                        }
                    </div>
                </ul>
                <div className="flex items-center bg-[#E02C6D] py-2 px-4 rounded-md gap-1">
                    <i className="fa-solid fa-cart-plus text-white text-xl"></i>
                    <div className="bg-white w-6 h-6 rounded-full flex items-center justify-center p-1">
                        <span className="text-xl font-bold text-gray-700">0</span>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
