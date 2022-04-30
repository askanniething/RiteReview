import React, { useContext, useEffect, useState } from "react";
import NavWrapper from "../components/NavWrapper";
import Card from "../components/Card";
import { ProjContext } from "../api/context";
import { get_user_reviews } from "../api/commands";

const Home = () => {
  const { user } = useContext(ProjContext);
  const [userReviews, setUserReviews] = useState();

  const getUserReviews = async () => {
    const { data } = await get_user_reviews(user._id);
    setUserReviews(data.data);
  };

  useEffect(() => {
    getUserReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavWrapper>
      <div className="p-3" style={{ width: "100%", minHeight: "100vh" }}>
        {user && userReviews && (
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>{user.firstName}'s Reviews</h2>
            {userReviews.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "500px 500px",
                  columnGap: "2rem",
                  gridGap: "2rem",
                }}
              >
                {userReviews.map((el) => {
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

export default Home;
