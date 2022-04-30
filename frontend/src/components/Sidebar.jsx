import React, { useContext, useEffect } from "react";
import { BsBookmarkPlusFill, BsGlobe } from "react-icons/bs";
import { AiFillHome, AiOutlineLogout, AiOutlineSearch } from "react-icons/ai";

import { logout_user } from "../api/commands";
import { Link } from "react-router-dom";
import { ProjContext } from "../api/context";

const Sidebar = () => {
  const { getUser } = useContext(ProjContext);

  const logout = async () => {
    const res = await logout_user();
    window.localStorage.removeItem("user");
    if (res.data === "complete") {
      window.location.href = "/";
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className=" flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ minWidth: "160px", minHeight: "100%", cursor: "pointer" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <BsBookmarkPlusFill style={{ color: "hotpink", marginRight: "5px" }} />
        <span className="fs-4" style={{ color: "hotpink" }}>
          RiteReview
        </span>
      </a>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link className="nav-link text-light" to="/">
            <AiFillHome style={{ color: "white", margin: "0 7px 5px 0" }} />
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/publicReviews">
            <BsGlobe style={{ color: "white", margin: "0 7px 5px 0" }} />
            Public Reviews
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/findBooks">
            <AiOutlineSearch
              style={{ color: "white", margin: "0 7px 5px 0" }}
            />
            Find Books
          </Link>
        </li>
      </ul>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item nav-link text-light" onClick={logout}>
          <AiOutlineLogout style={{ color: "white", margin: "0 7px 5px 0" }} />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
