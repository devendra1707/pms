import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

const CustomNavbar = ({ login, onLogout }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    const sidebar = document.querySelector("#sidebar");
    sidebar.classList.toggle("collapsed");
  };

  const handleSidebarToggle = () => {
    toggleSidebar();
    setIsOpen(!isOpen);
  };

  const logout = async () => {
    await onLogout();
    navigate("/");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="navbar navbar-expand px-3 border-bottom">
      <div className="btn" onClick={handleSidebarToggle}>
        <div style={{ width: "40px", height: "40px" }}>
          <HiOutlineMenuAlt2 style={{ fontSize: "1.5rem" }} />
        </div>
      </div>
      <div className="navbar-collapse navbar">
        <ul className="navbar-nav">
          {!login && (
            <>
              <div className="mx-2">
                <Link className="btn btn-secondary" to="/login">
                  Login
                </Link>
              </div>
              <div className="mx-2">
                <Link className="btn btn-secondary" to="/signup">
                  Register
                </Link>
              </div>
            </>
          )}
          {login && (
            <>
              <li className="nav-item dropdown">
                <Link
                  to="#"
                  data-bs-toggle="dropdown"
                  className="nav-icon pe-md-0"
                >
                  <FaRegUserCircle size={30} color="black" />
                </Link>
                <div className="dropdown-menu dropdown-menu-end">
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                  {/* <Link to="/updateprofile" className="dropdown-item">
                    Update Profile
                  </Link> */}

                  <Link className="dropdown-item" onClick={logout}>
                    Logout
                  </Link>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default CustomNavbar;
