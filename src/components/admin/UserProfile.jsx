import React, { useState, useEffect } from "react";
import Base from "../navbar/Base";
import { getCurrentUser } from "../../services/UserService";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <Base>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <div className="text-center mb-4">
                  <img
                    src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars.png"
                    alt="User Profile"
                    className="img-fluid rounded-circle mb-3"
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>
                {user && (
                  <table className="table table-bordered border border-secondary p-3 rounded table-custom-rounded">
                    <tbody>
                      <tr>
                        <th scope="row">Name</th>
                        <td>{user.name}</td>
                      </tr>
                      <tr>
                        <th scope="row">Email</th>
                        <td>{user.email}</td>
                      </tr>
                      <tr>
                        <th scope="row">Mobile Number</th>
                        <td>{user.mobNumber}</td>
                      </tr>
                      <tr>
                        <th scope="row">Registered on</th>
                        <td>{user.regDate}</td>
                      </tr>
                      <tr>
                        <th scope="row">Roles</th>
                        <td>{user.roles.map((role) => role.roleName).join(", ")}</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default UserProfile;
