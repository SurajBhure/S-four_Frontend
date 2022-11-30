import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav className="nav">
        <div className="container">
          <div className="flex justify-center items-center">
            <Link to="/">
              <img className="w-[300px]" src="/images/spacex_logo.png" alt="logo" />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
