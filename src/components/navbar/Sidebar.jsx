import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUserDetail } from "../../auth";
import { FaList } from "react-icons/fa";
import { MdOutlineAddCard } from "react-icons/md";
import { TbEyeFilled } from "react-icons/tb";
import { BiCartAdd } from "react-icons/bi";
import { getCurrentUser } from "../../services/UserService";
import { FaUserPlus } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { IoIosList } from "react-icons/io";

const Sidebar = ({ login }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        setUserName(data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setUser(getCurrentUserDetail());
  }, [login]);

  return (
    <aside id="sidebar" className="js-sidebar">
      {/* {JSON.stringify(userName)} */}
      <div className="h-100">
        <div className="sidebar-logo">
          <Link to="/">PMS</Link>
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-header"></li>
          <li className="sidebar-item">
            <Link to="/" className="sidebar-link">
              <FaList className="me-2" />
              Dashboard
            </Link>
          </li>
          {login && (
            <>
              <hr />
              <i
                className="px-4"
                style={{
                  fontFamily: "sans-serif",
                  fontSize: "1.2em",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  // color: "darkslateblue",
                  color: "darkslategrey",
                }}
              >
                <span style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
                  Welcome:
                </span>
                {userName}
              </i>
              <hr />

              <li className="sidebar-item">
                <Link to="/create-product" className="sidebar-link">
                  <MdOutlineAddCard className="me-2" />
                  Add Product
                </Link>
              </li>

              <li className="sidebar-item">
                <Link to="/view-product" className="sidebar-link">
                  <TbEyeFilled className="me-2" />
                  View Product
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to="/purchase" className="sidebar-link">
                  <BiCartAdd className="me-2" />
                  Purchase Product
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to="/purchase-list" className="sidebar-link">
                  <IoIosList className="me-2" />
                  Purchase List
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to="/create-customer" className="sidebar-link">
                  <FaUserPlus className="me-2" />
                  Add Customer
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to="/view-customer" className="sidebar-link">
                  <FaUsers className="me-2" />
                  View Customer
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
