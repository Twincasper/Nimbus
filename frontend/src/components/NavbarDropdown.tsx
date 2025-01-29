import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Separate NavbarDropdown component
const NavbarDropdown = ({ user }) => {
    const navigate = useNavigate();

    return (
        <div className="flex-1 justify-end">
        <div className="flex items-center gap-2">
        <div className="form-control">
        <input
            type="text"
    placeholder="Search"
    className="input input-bordered w-24 md:w-auto"
        />
        </div>
        <div className="dropdown dropdown-end">
    <label
        tabIndex={0}
    className="btn btn-ghost btn-circle avatar"
    >
    <div className="w-10 rounded-full">
    <img
        alt="User avatar"
    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        />
        </div>
        </label>
        <ul
    tabIndex={0}
    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
    >
    <li>
        <Link
            to={`/profile/${user}`}
    className="justify-between"
    >
    Profile
    </Link>
    </li>
    <li>
    <Link to="/settings">Settings</Link>
    </li>
    <li>
    <button
        onClick={() => {
        // Add your logout logic here
        console.log('Logout clicked');
    }}
>
    Logout
    </button>
    </li>
    </ul>
    </div>
    </div>
    </div>
);
};