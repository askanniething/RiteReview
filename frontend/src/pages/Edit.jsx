import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Col, Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

import { STATUS_OPTIONS, RATING_OPTIONS, FRONTEND_URL } from "../consts";
import NavWrapper from "../components/NavWrapper";
import { ProjContext } from "../api/context";
import { get_review } from "../api/commands";

const Edit = () => {
  const { id } = useParams();

  const [oldReview, setOldReview] = useState({});

  const { user, editReview } = useContext(ProjContext);
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState(0);
  const [bookImage, setBookImage] = useState("");

  const getReview = async () => {
    const { data } = await get_review(id);
    setOldReview(data.data);
  };

  useEffect(() => {
    getReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Object.keys(oldReview).length > 0) {
      setTitle(oldReview.title);
      setBody(oldReview.body);
      setStatus(oldReview.status);
      setRating(oldReview.rating);
      setBookImage(oldReview.bookImage);
    }
  }, [oldReview]);

  const editNewReview = async () => {
    await editReview(id, {
      bookId: oldReview.bookId,
      bookImage,
      title,
      rating,
      body,
      status,
      user,
    });
    window.location.href = "/";
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (title && body && rating) {
      editNewReview();
    }
    setValidated(true);
  };

  return (
    <NavWrapper>
      <div className="p-3" style={{ width: "100%", minHeight: "100vh" }}>
        {title && body && status && bookImage && (
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <h2>Edit Review</h2>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              style={{ width: "700px" }}
              action={FRONTEND_URL + "/publicReviews"}
            >
              <Form.Group
                as={Col}
                md="12"
                controlId="validationCustom03"
                style={{ marginBottom: "30px" }}
              >
                <Form.Label style={{ fontWeight: "500", fontSize: "20px" }}>
                  Title
                </Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group
                as={Col}
                md="12"
                controlId="validationCustom03"
                style={{ marginBottom: "30px" }}
              >
                <Form.Label style={{ fontWeight: "500", fontSize: "20px" }}>
                  Rating
                </Form.Label>
                <div>
                  {RATING_OPTIONS.map((el) => {
                    return (
                      <Form.Check
                        inline
                        label={el.toString()}
                        name="rating"
                        type="radio"
                        key={`check-${el}`}
                        onChange={() => setRating(el)}
                        checked={el === rating}
                        required
                      />
                    );
                  })}
                </div>
              </Form.Group>
              <Form.Group
                as={Col}
                md="12"
                controlId="validationCustom03"
                style={{ marginBottom: "30px" }}
              >
                <Form.Label style={{ fontWeight: "500", fontSize: "20px" }}>
                  Body
                </Form.Label>
                <Form.Control
                  as="textarea"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group
                as={Col}
                md="12"
                controlId="validationCustom03"
                style={{ marginBottom: "30px" }}
              >
                <Form.Label style={{ fontWeight: "500", fontSize: "20px" }}>
                  Status
                </Form.Label>
                <Form.Select
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                >
                  <option value={STATUS_OPTIONS.public}>
                    {STATUS_OPTIONS.public}
                  </option>
                  <option value={STATUS_OPTIONS.private}>
                    {STATUS_OPTIONS.private}
                  </option>
                </Form.Select>
              </Form.Group>
              <Button
                className="btn btn-secondary"
                style={{ borderRadius: "50px" }}
                type="submit"
              >
                Submit Review
                <FaEdit style={{ margin: "0 0 5px 5px" }} />
              </Button>
            </Form>
          </div>
        )}
      </div>
    </NavWrapper>
  );
};

export default Edit;
