import React, { useState } from "react";
import NavWrapper from "../components/NavWrapper";
import BookWidget from "../components/BookWidget";
import { get_books } from "../api/commands";

const FindBooks = () => {
  const [search, setSearch] = useState();
  const [books, setBooks] = useState();

  const transformString = (str) => {
    return str.replace(/ /g, "+");
  };

  const searchBooks = async () => {
    const res = await get_books(transformString(search));
    setBooks(res.data.data.items);
  };

  return (
    <NavWrapper>
      <div
        className="p-3"
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "700px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Search for Books!</h2>
          <div className="input-group mb-3" style={{ width: "700px" }}>
            <input
              required
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
              placeholder="Book Title"
              aria-label="Book Title"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <div
                className="input-group-text"
                id="basic-addon2"
                onClick={searchBooks}
                style={{ cursor: "pointer" }}
              >
                Search
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {books ? (
              books.map((el, id) => {
                return (
                  <div
                    style={{ marginBottom: "20px", width: "100%" }}
                    key={`div-${id}`}
                  >
                    <BookWidget
                      book={el}
                      redirectURL={`/book/${el.id}`}
                      key={`book-${id}`}
                    />
                  </div>
                );
              })
            ) : (
              <h5 style={{ fontStyle: "italic", color: "lightgrey" }}>
                {" "}
                Nothing to display{" "}
              </h5>
            )}
          </div>
        </div>
      </div>
    </NavWrapper>
  );
};

export default FindBooks;
