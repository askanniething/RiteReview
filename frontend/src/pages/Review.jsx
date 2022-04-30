import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import { format, parseISO } from "date-fns";

import NavWrapper from "../components/NavWrapper";
import BookWidget from "../components/BookWidget";
import { useParams, Link } from "react-router-dom";
import { get_review, get_book } from "../api/commands";

const Review = () => {
  const { id } = useParams();

  const [review, setReview] = useState();
  const [book, setBook] = useState();

  const getReview = async () => {
    const { data } = await get_review(id);
    setReview(data.data);
  };

  const getBook = async () => {
    const { data } = await get_book(review.bookId);
    setBook(data);
  };

  useEffect(() => {
    getReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (review) {
      getBook();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [review]);

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
        {review && book && (
          <div
            style={{
              width: "700px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>{review.title}</h2>
            <BookWidget book={book} />
            <div style={{ width: "100%", marginTop: "30px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  margin: "0 0 10px 5px",
                }}
              >
                <p
                  className="card-text text-left"
                  style={{
                    fontSize: 16,
                    fontWeight: "400",
                    marginBottom: "5px",
                    width: "150px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {review.status.slice(0, 1).toUpperCase() +
                    review.status.slice(1)}{" "}
                  Review
                </p>
                <GoPrimitiveDot />
                <div>
                  {[...Array(review.rating)].map((el, id) => {
                    return (
                      <AiFillStar
                        key={`filled-star-${id}`}
                        style={{ width: "30px", height: "30px" }}
                      />
                    );
                  })}
                  {[...Array(5 - review.rating)].map((el, id) => {
                    return (
                      <AiOutlineStar
                        key={`unfilled-star-${id}`}
                        style={{ width: "30px", height: "30px" }}
                      />
                    );
                  })}
                </div>
                <GoPrimitiveDot />
                <p
                  className="card-text text-left"
                  style={{
                    fontStyle: "italic",
                    fontSize: 16,
                    fontWeight: "400",
                    marginBottom: "5px",
                    width: "150px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Written: {format(parseISO(review.createdAt), "MM/dd/yyyy")}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  margin: "20px 0",
                }}
              >
                <Link
                  to={`/user/${review.user._id}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    width: "40%",
                  }}
                >
                  <div
                    style={{
                      margin: "0 0 10px 0",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      borderRadius: "50px",
                      backgroundColor: "#e9ebf0",
                      height: "50px",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={review.user.image.toString()}
                      alt=""
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50px",
                        margin: "0 5px",
                      }}
                    />
                    <h6
                      style={{
                        paddingTop: "7px",
                        fontStyle: "italic",
                        fontSize: 20,
                        fontWeight: "400",
                      }}
                    >
                      {review.user.displayName}
                    </h6>
                  </div>
                </Link>
              </div>
              <div style={{ marginBottom: "30px" }}>{review.body}</div>
            </div>
          </div>
        )}
      </div>
    </NavWrapper>
  );
};

export default Review;
