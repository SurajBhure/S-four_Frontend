import React from "react";
import { NavLink } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineShoppingCart, AiOutlineLogout } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logout } from "../../app/reducers/authReducer";

const AccountList = () => {
  const dispatch = useDispatch();
  return (
    <>
      <NavLink to="/user" className="account-list active">
        <BiUserCircle size={22} />
        <span className="account-list-tittle">My Account</span>
      </NavLink>
      <NavLink to="/orders" className="account-list">
        <AiOutlineShoppingCart size={22} />
        <span className="account-list-tittle">orders</span>
      </NavLink>
      <span
        className="account-list cursor-pointer"
        onClick={() => dispatch(logout("user-token"))}
      >
        <AiOutlineLogout size={22} />
        <span className="account-list-tittle">logout</span>
      </span>
    </>
  );
};

export default AccountList;
