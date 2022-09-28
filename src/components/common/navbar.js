import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="mb-4 mx-4">
      <div className="flex items-center justify-between h-16">
        <div className="contents">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-8 w-8 bg-green-200 stroke-current text-indigo-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
            />
          </svg>
          <Link to="/">
            <h3 className="ml-1 text-xl font-semibold">Wheter App</h3>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
4;
