import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ side, closeSidebar }) => {
  return (
    <>
      <div
        className={`fixed top-0 ${side} sm:left-0 w-64 h-screen bg-gray-900 z-10 transition-all`}
      >
        <i
          className="bi bi-x-lg absolute top-4 right-4 sm:hidden cursor-pointer text-lg"
          onClick={closeSidebar}
        ></i>
        <div className="bg-white">
          <h3 className="p-3 pl-5 font-sans text-slate-600 tracking-wide text-xl font-bold antialiased">
            S-four <span className="italic">Bazar</span>
          </h3>
        </div>
        <ul className="mt-4">
          <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-gray-600">
            <i className="bi bi-card-list mr-2 inline-block text-lg"></i>
            <Link to="/dashboard/products" className="text-base capitalize">
              Products
            </Link>
          </li>
          <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-gray-600">
            <i className="bi bi-bag-check mr-2 inline-block text-lg"></i>
            <Link to="/dashboard/products" className="text-base capitalize">
              Orders
            </Link>
          </li>
          <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-gray-600">
            <i className="bi bi-people-fill mr-2 inline-block text-lg"></i>
            <Link to="/dashboard/products" className="text-base capitalize">
              Customers
            </Link>
          </li>
          <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-gray-600">
            <i className="bi bi-bar-chart mr-2 inline-block text-lg"></i>
            <Link to="/dashboard/categories" className="text-base capitalize">
              Categories
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
