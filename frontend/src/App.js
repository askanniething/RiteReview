import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { ProjContext } from "./api/context";
import Home from "./pages/Home";
import PublicReviews from "./pages/PublicReviews";
import User from "./pages/User";
import Review from "./pages/Review";
import FindBooks from "./pages/FindBooks";
import Book from "./pages/Book";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Landing from "./pages/Landing";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { user } = useContext(ProjContext);
  const storageUser = window.localStorage.getItem("user");

  return (
    <>
      <Routes>
        {storageUser || user ? (
          <>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/publicReviews" element={<PublicReviews />} />
            <Route exact path="/user/:id" element={<User />} />
            <Route exact path="/review/:id" element={<Review />} />
            <Route exact path="/book/:id" element={<Book />} />
            <Route exact path="/add/:id" element={<Add />} />
            <Route exact path="/edit/:id" element={<Edit />} />
            <Route exact path="/login" element={<Navigate to="/" replace />} />
            <Route exact path="/findBooks" element={<FindBooks />} />
            <Route exact path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route exact path="/login" element={<Landing />} />
            <Route exact path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
