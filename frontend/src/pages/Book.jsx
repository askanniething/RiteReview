import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Button from "react-bootstrap/Button";

import NavWrapper from "../components/NavWrapper";
import Card from "../components/Card";
import { get_book_reviews, get_book, find_review } from "../api/commands";
import BookWidget from "../components/BookWidget";
import { ProjContext } from "../api/context";

const Book = () => {
  const { user } = useContext(ProjContext);
  const { id } = useParams();

  const [bookReviews, setBookReviews] = useState();
  const [book, setBook] = useState();
  const [canAdd, setCanAdd] = useState();

  const getBookReviews = async () => {
    const { data } = await get_book_reviews(id);
    setBookReviews(data.data);
  };

  const getBook = async () => {
    const { data } = await get_book(id);
    setBook(data);
  };

  const findBook = async () => {
    const { data } = await find_review(id);
    setCanAdd(data.exist);
  };

  useEffect(() => {
    getBookReviews();
    getBook();
    findBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavWrapper>
      <div
        className="p-3"
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {book && typeof canAdd !== "undefined" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "700px",
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>
              {" "}
              Read Reviews for {book.volumeInfo.title}{" "}
            </h2>
            <BookWidget book={book} style={{ width: "700px" }} />
            <Button
              className="btn btn-secondary"
              style={{
                borderRadius: "50px",
                marginTop: "20px",
                textDecoration: "none",
              }}
              disabled={canAdd}
            >
              <Link
                className="text-white"
                style={{ textDecoration: "none" }}
                to={`/add/${book.id}`}
              >
                Add a Review
                <AiOutlinePlusCircle style={{ margin: "0 0 2px 5px" }} />
              </Link>
            </Button>
            <h4
              style={{ margin: "20px 0", fontStyle: "italic", color: "grey" }}
            >
              {" "}
              Reviews{" "}
            </h4>
            <hr />
          </div>
        )}
        {bookReviews ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              minHeight: "100vh",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "500px 500px",
                columnGap: "2rem",
                gridGap: "2rem",
              }}
            >
              {bookReviews &&
                bookReviews.map((el) => {
                  return (
                    <Card
                      bookId={el.bookId}
                      bookImage={el.bookImage}
                      body={el.body}
                      createdAt={el.createdAt}
                      rating={el.rating}
                      title={el.title}
                      user={el.user}
                      _id={el._id}
                      canEdit={el.user._id === user._id}
                      key={`Card-${el._id}`}
                    />
                  );
                })}
            </div>
          </div>
        ) : (
          <h5 style={{ fontStyle: "italic", color: "lightgrey" }}>
            {" "}
            No Reviews to Display{" "}
          </h5>
        )}
      </div>
    </NavWrapper>
  );
};

export default Book;
