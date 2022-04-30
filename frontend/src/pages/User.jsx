import React, { useEffect, useState } from "react";
import NavWrapper from "../components/NavWrapper";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import { get_user_reviews, get_single_user } from "../api/commands";

const User = () => {
  const { id } = useParams();

  const [userReviews, setUserReviews] = useState([]);
  const [newUser, setNewUser] = useState({});

  const getNewUser = async () => {
    const { data } = await get_single_user(id);
    setNewUser(data.data);
  };

  const getUserReviews = async () => {
    const { data } = await get_user_reviews(id);
    setUserReviews(data.data);
  };

  useEffect(() => {
    getUserReviews();
    getNewUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavWrapper>
      <div className="p-3" style={{ width: "100%", minHeight: "100vh" }}>
        {Object.keys(newUser).length > 0 && userReviews.length > 0 && (
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>
              {newUser.firstName}'s Reviews
            </h2>
            {userReviews && userReviews.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "500px 500px",
                  columnGap: "2rem",
                  gridGap: "2rem",
                }}
              >
                {userReviews &&
                  userReviews.map((el) => {
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
                        canEdit={el.user._id === newUser._id}
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

export default User;
