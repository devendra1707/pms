import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ crumbs }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb justify-content-end">
        {crumbs.map((crumb, index) => (
          <li key={index} className="breadcrumb-item">
            {crumb.path ? (
              <Link to={crumb.path}>{crumb.label}</Link>
            ) : (
              crumb.label
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;