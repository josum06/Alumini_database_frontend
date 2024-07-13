

import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import msalInstance from "./msalConfig";
import "./NavBar.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [account, setAccount] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const initializeMsal = async () => {
    try {
      await msalInstance.initialize();
    } catch (error) {
      console.error("MSAL initialization failed:", error);
    }
  };

  const handleLogin = async () => {
    try {
      await initializeMsal();
      const loginResponse = await msalInstance.loginPopup({
        scopes: ["user.read"],
      });
      setAccount(loginResponse.account);
      // Store user details
      localStorage.setItem("msalAccount", JSON.stringify(loginResponse.account));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    msalInstance.logoutPopup();
    setAccount(null);
    localStorage.removeItem("msalAccount");
  };

  // Check if user is already logged in
  useEffect(() => {
    const storedAccount = JSON.parse(localStorage.getItem("msalAccount"));
    if (storedAccount) {
      setAccount(storedAccount);
    }
  }, []);

  return (
    <nav className="navbar fixed top-0 left-0 right-0 bg-white shadow-md z-40">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 items-center py-3 md:py-5">
        <div className="flex items-center">
          <Link to="/">
            <img
              className="h-12"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7RzOQ_E52YXYZQ4Vwrbnbs_HaBhq0ZEvXrQ&s"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="md:hidden flex justify-end">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:col-span-2 md:justify-end space-x-1 text-sm md:text-base text-gray-700`}
        >
          <li>
            <NavLink
              exact
              to="/"
              className="nav-link px-3 flex text-sm shrink md:text-base"
              activeClassName="active"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Alumini_Directory"
              className="nav-link flex px-2 text-sm md:text-base"
              activeClassName="active"
            >
              Alumni Directory
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Alumini-Achivements"
              className="nav-link flex px-2 sm:text-sm md:text-base"
              activeClassName="active"
            >
              Achievements
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Netwoking_Opportunities"
              className="nav-link flex px-2 sm:text-sm md:text-base"
              activeClassName="active"
            >
              Networking
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/News"
              className="nav-link flex px-2 sm:text-sm md:text-base"
              activeClassName="active"
            >
              News
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Mobile_App"
              className="nav-link flex px-2 sm:text-sm md:text-base"
              activeClassName="active"
            >
              Mobile App
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Contact"
              className="nav-link flex px-2 sm:text-sm md:text-base"
              activeClassName="active"
            >
              Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Student_Registration"
              className="nav-link flex px-2 sm:text-sm md:text-base"
              activeClassName="active"
            >
              Students
            </NavLink>
          </li>
          {account ? (
            <li>
              <button
                onClick={handleLogout}
                className="nav-link-button"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <button
                onClick={handleLogin}
                className="nav-link-button"
              >
                Login
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
