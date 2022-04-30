import React, { useContext } from "react";
import { format, parseISO } from "date-fns";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";
import {
  AiFillDelete,
  AiOutlineArrowRight,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

import { ProjContext } from "../api/context";

const maxBody = 160;
const maxTitle = 20;

const BookCard = ({
  bookId,
  bookImage,
  title,
  rating,
  body,
  user,
  createdAt,
  _id,
  canEdit,
}) => {
  const { deleteReview } = useContext(ProjContext);

  const formatText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const deleteCardReview = async () => {
    await deleteReview(_id);
    window.location.reload();
  };

  return (
    <Card style={{ width: "500px", height: "300px" }}>
      <Row className="no-gutters">
        <Col md={6} lg={4} style={{ padding: "0 0 0 20px" }}>
          <Link
            to={`/book/${bookId}`}
            style={{ height: "100%", display: "flex", alignItems: "center" }}
          >
            <Card.Img
              variant="top"
              src={bookImage}
              style={{ height: "auto", width: "155px" }}
            />
          </Link>
        </Col>
        <Col style={{ height: "300px" }}>
          <Card.Body style={{ height: "300px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Card.Title>{formatText(title, maxTitle)}</Card.Title>
              {canEdit && (
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Link to={`/edit/${_id}`}>
                    <FaEdit
                      style={{
                        width: "25px",
                        height: "25px",
                        borderRadius: "5px",
                        marginRight: "2px",
                        color: "black",
                      }}
                    />
                  </Link>
                  <AiFillDelete
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "5px",
                      margin: "2px 0 2px 0",
                      cursor: "pointer",
                      color: "black",
                    }}
                    onClick={deleteCardReview}
                  />
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                margin: "0 0 10px 5px",
              }}
            >
              {[...Array(rating)].map((el, id) => {
                return <AiFillStar key={`filled-star-${id}`} />;
              })}
              {[...Array(5 - rating)].map((el, id) => {
                return <AiOutlineStar key={`unfilled-star-${id}`} />;
              })}
            </div>
            <Link
              to={`/user/${user._id}`}
              style={{
                textDecoration: "none",
                color: "black",
                margin: "0 0 10px 0",
                width: "50%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                borderRadius: "50px",
                backgroundColor: "#e9ebf0",
                height: "30px",
                textAlign: "center",
              }}
            >
              <img
                src={user.image.toString()}
                alt=""
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50px",
                  margin: "0 5px",
                }}
              />
              <h6
                style={{
                  paddingTop: "7px",
                  fontStyle: "italic",
                  fontSize: 14,
                  fontWeight: "400",
                }}
              >
                {user.displayName}
              </h6>
            </Link>
            <Card.Text style={{ fontSize: 14, lineHeight: 1.5 }}>
              {formatText(body, maxBody)}
            </Card.Text>
            <div style={{ position: "absolute", bottom: "10px" }}>
              <p
                className="card-text text-left"
                style={{
                  fontStyle: "italic",
                  fontSize: 12,
                  fontWeight: "400",
                  marginBottom: "5px",
                }}
              >
                Written: {format(parseISO(createdAt), "MM/dd/yyyy")}
              </p>
              <Link
                className="btn btn-secondary"
                style={{ borderRadius: "50px" }}
                to={`/review/${_id}`}
              >
                Read Review
                <AiOutlineArrowRight style={{ margin: "0 0 2px 5px" }} />
              </Link>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default BookCard;
