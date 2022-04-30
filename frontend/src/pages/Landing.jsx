import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { BACKEND_URL } from "../consts";
import { ProjContext } from "../api/context";
import { useEffect } from "react";

const Landing = () => {
  const { user, getUser } = useContext(ProjContext);

  const login = () => {
    window.open(`${BACKEND_URL}/auth/google`, "_self");
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {!user && (
        <>
          <h1 style={{ margin: "0 0 50px 0" }}>
            Login to <span style={{ color: "hotpink" }}>RiteReview</span>
          </h1>
          <div
            className="btn btn-light"
            onClick={login}
            style={{ borderRadius: "50px" }}
          >
            <FcGoogle
              style={{ margin: "0 10px 0px 0", width: "40px", height: "40px" }}
            />
            Login with Google
          </div>
        </>
      )}
    </div>
  );
};

export default Landing;
