import { useState, useEffect, useRef } from "react";
import "../../src/index.css";

const NavigationBar = () => {
  const [isSearchBoxOpen, setSearchBoxOpen] = useState(false);
  const searchBoxRef = useRef(null);

  const toggleSearchBox = () => {
    setSearchBoxOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      setSearchBoxOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="header fixed top-0 bg-white shadow-md flex items-center justify-between mx-auto px-16 left-0 w-full z-50">
      <div className="w-3/12">
          <h1 className="text-3xl font-bold">
            <span className="text-blue-600">GBook</span>
            <span className="text-black">!</span>
          </h1>
        </div>

        <nav className="nav font-semibold text-lg">
          <ul className="ml-20 flex items-center">
            <li className="p-4 border-b-2 border-blue-600 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
              <a href="/">Home</a>
            </li>
            <li className="p-4 border-b-2 border-blue-600 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
              <a href="/dashboard">Books</a>
            </li>
            <li className="p-4 border-b-2 border-blue-600 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
              <a href="">Collections</a>
            </li>
            <li className="p-4 border-b-2 border-blue-600 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
              <a href="/discussion">New Arrivals</a>
            </li>
          </ul>
        </nav>

        <div
          className="w-3/12 flex justify-end items-center relative"
          ref={searchBoxRef}
        >
          {/* Search Input */}
          {isSearchBoxOpen && (
            <input
              type="text"
              placeholder="Search..."
              className="ml-12 p-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 transition-all duration-500 transform"
              style={{
                transform: isSearchBoxOpen ? "translateX(150px)" : "scale(0)",
                opacity: isSearchBoxOpen ? 1 : 0,
              }}
            />
          )}

          {/* Search Button */}
          <button
            onClick={toggleSearchBox}
            className="mr-36 focus:outline-none transition-transform duration-500 transform"
            style={{
              transform: isSearchBoxOpen ? "translateX(100px)" : "translateX(0)",
            }}
          >
            <svg
              className="h-8 p-1 hover:text-blue-600 duration-200"
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="search"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
              ></path>
            </svg>
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          <a className="text-sm font-semibold text-black" href="/login">
            Sign In
          </a>
          <a className="text-sm font-semibold text-black" href="/register">
            Register
          </a>
        </div>
      </header>
    </>
  );
};

export default NavigationBar;