import React, { useEffect } from "react";
import Base from "../navbar/Base";

const Home = () => {

  const pageTitle = "Home Page";

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <Base>
      <div>Home</div>
    </Base>
  );
};

export default Home;
