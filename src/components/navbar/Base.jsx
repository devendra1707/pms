import React from "react";
import Sidebar from "./Sidebar";
import CustomNavbar from "./CustomNavbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doLogout, isLoggedIn } from "../../auth";

const Base = ({ children }) => {
  const [login, setLogin] = useState(isLoggedIn());
  const navigate = useNavigate();

  const handleLogout = () => {
    doLogout(() => {
      setLogin(false);
      navigate("/");
    });
  };
  return (
    <div className="wrapper">
      <Sidebar login={login} />
      <div className="main">
        <CustomNavbar login={login} onLogout={handleLogout} />
        {children}
      </div>
    </div>
  );
};

export default Base;