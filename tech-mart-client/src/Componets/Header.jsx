import React, { useContext, useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
const Header = () => {
    const [open, setOpen] = useState(false);
    const { user, handleLogOut } = useContext(AuthContext);
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
                    <li className="py-6 px-6 mt-10 md:mt-0"><NavLink to="/orderList">Order List</NavLink></li>
                    <div>
                        {
                            user ?
                                <div className='flex items-center'>
                                    <li className="py-6 px-6"><NavLink to="/addproduct">Add Products</NavLink></li>
                                    <li className="py-6 px-6"><NavLink to="/admin">Admin</NavLink></li>
                                </div> : ""
                        }
                    </div>
                    <div>
                        {
                            user ? <li onClick={handleLogOut} className="py-6 px-6"><NavLink to="/login">LogOut</NavLink></li> : <li className="py-6 px-6"><NavLink to="/login">LogIn</NavLink></li>
                        }
                    </div>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
