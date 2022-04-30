import React, { useContext, useEffect } from "react";
import NavWrapper from "../components/NavWrapper";
import Card from "../components/Card";
import { ProjContext } from "../api/context";

const PublicReviews = () => {
  const { user, getAllReviews, reviews } = useContext(ProjContext);

  useEffect(() => {
    getAllReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavWrapper>
      <div className="p-3" style={{ width: "100%", minHeight: "100vh" }}>
        {user && (
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>Public Reviews</h2>
            {reviews && reviews.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "500px 500px",
                  columnGap: "2rem",
                  gridGap: "2rem",
                }}
              >
                {reviews &&
                  reviews.map((el) => {
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
            ) : (
              <h5 style={{ fontStyle: "italic", color: "lightgrey" }}>
                {" "}
                Nothing to display{" "}
              </h5>
            )}
          </div>
        )}
      </div>
    </NavWrapper>
  );
};

export default PublicReviews;
