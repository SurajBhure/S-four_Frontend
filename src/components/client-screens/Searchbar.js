import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toggleSearchBar } from "../../app/reducers/globalReducer";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchBar } = useSelector((state) => state.globalReducer); // Searchbar on/ off handle through

  const [state, setState] = useState("");

  const closeSearch = (e) => {
    const id = e.target.getAttribute("id");
    id === "search" && dispatch(toggleSearchBar());
  };
  const searchProduct = () => {
    if (state === "") {
      return;
    }
    navigate(`/search-products/${state}/1`);
    dispatch(toggleSearchBar());
    setState("");
  };
  return (
    searchBar && (
      <motion.div
        className="fixed inset-0 w-full bg-black/50 z-[300]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        id="search"
        onClick={closeSearch}
      >
        <div className="flex justify-center -mx-8">
          <div className="w-full sm:w-10/12 lg:w-8/12 lg:w-6/12 px-8 mt-10 relative">
            <input
              type="text"
              className="w-full bg-white h-[50px] rounded outline-none pl-5 pr-14"
              placeholder="Search Products..."
              name="search"
              value={state}
              onChange={(e) => setState(e.target.value)}
              id="searchInput"
            />
            <FiSearch
              className="absolute top-[13px] right-12 text-2xl text-gray-500 cursor-pointer"
              onClick={searchProduct}
            />
          </div>
        </div>
      </motion.div>
    )
  );
};

export default Searchbar;
