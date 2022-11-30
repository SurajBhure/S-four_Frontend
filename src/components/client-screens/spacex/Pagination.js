import React from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const Pagination = ({
  launchesPerPage,
  totalLaunches,
  paginate,
  currentLaunches,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalLaunches / launchesPerPage); i++) {
    pageNumbers.push(i);
  }
  // console.log("currentLaunches", currentLaunches);

  return (
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between mt-3">
      <div>
        <p className="text-sm text-gray-700">
          Showing
          <span className="font-medium mx-1">
            {currentLaunches[0]?.flight_number}
          </span>
          to
          <span className="font-medium mx-1">
            {currentLaunches[11]?.flight_number}
          </span>
          of
          <span className="font-medium mx-1">{totalLaunches}</span>
          Launches
        </p>
      </div>
      <div>
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <a
            href="#"
            className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          >
            <FiChevronLeft size={18} />
          </a>

          {pageNumbers.map((number,i) => (
            <a
              href="#"
              onClick={() => paginate(number)}
              className="pagination-link"
              key={number + i}
            >
              {number}
            </a>
          ))}

          <a
            href="#"
            className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          >
            <FiChevronRight size={18} />
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
