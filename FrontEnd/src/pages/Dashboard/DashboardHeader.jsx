import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutSuccess } from '../../redux/user/userSlice.js'; 
import xeno from '../../assets/images/Xeno1.png';

export default function DashboardHeader() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        // Dispatch the signOutSuccess action to update the Redux state
        dispatch(signOutSuccess());

        // Clear any stored authentication tokens if you use them
        localStorage.removeItem('authToken');

        // Navigate to the home page
        navigate('/');
    };

    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src={xeno}
                            className="mr-3 h-12 rounded-md"
                            alt="Logo"
                        />
                    </Link>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    to="/campaigns"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${
                                            isActive ? 'text-orange-700' : 'text-gray-700'
                                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Campaign Management
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/communications"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${
                                            isActive ? 'text-orange-700' : 'text-gray-700'
                                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Communication Logs
                                </NavLink>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                >
                                    Log Out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
