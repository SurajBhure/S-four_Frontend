import React from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { BsBag } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Searchbar from "./Searchbar";
import { toggleSearchBar } from "../../app/reducers/globalReducer";

const Nav = () => {
  const dispatch = useDispatch();
  const { userToken, user } = useSelector((state) => state.authReducer);
  const { searchBar } = useSelector((state) => state.globalReducer);
  const { items, total } = useSelector((state) => state.cart);
  // console.log("Total Price:->",total);
  // console.log("Total items:->",items);
  return (
    <>
      <nav className="nav">
        <div className="container">
          <div className="flex justify-between items-center">
            <Link to="/">
              <h3 className="logo-text">
                S-four <span className="italic">Bazar</span>
              </h3>
            </Link>
            <ul className="flex">
              <li className="flex-item nav-li">
                <FiSearch
                  size={23}
                  onClick={() => dispatch(toggleSearchBar())}
                />
              </li>
              {userToken ? (
                <li className="flex-item nav-li">
                  <Link to="/user" className="nav-link">
                    {user?.name}
                  </Link>
                </li>
              ) : (
                <li className="flex-item nav-li">
                  <Link to="/login" className="nav-link">
                    sign in
                  </Link>
                </li>
              )}
              <li className="flex-item nav-li relative">
                <Link to="/cart">
                  <BsBag size={22} />
                </Link>
                <span className="nav-circle">{items}</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Searchbar />
    </>
  );
};

export default Nav;
