import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";
import { format, parseISO } from "date-fns";

export const BookWidget = ({ book, redirectURL }) => {
  const formatAuthor = (el, id) => (id > 0 ? `, ${el}` : el);

  return (
    <>
      {book &&
        book.volumeInfo &&
        book.volumeInfo.authors &&
        book.volumeInfo.imageLinks && (
          <Card style={{ width: "100%", height: "220px" }}>
            <Row className="no-gutters">
              <Col md={6} lg={4}>
                {redirectURL ? (
                  <Link
                    to={redirectURL}
                    style={{
                      width: "100%",
                      height: "220px",
                      background: "#f7f7f7",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={book.volumeInfo.imageLinks.thumbnail.toString()}
                      style={{
                        height: "180px",
                        width: "auto",
                        maxWidth: "215px",
                      }}
                    />
                  </Link>
                ) : (
                  <a
                    href={book.volumeInfo.infoLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      width: "100%",
                      height: "220px",
                      background: "#f7f7f7",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={book.volumeInfo.imageLinks.thumbnail.toString()}
                      style={{
                        height: "180px",
                        width: "auto",
                        maxWidth: "215px",
                      }}
                    />
                  </a>
                )}
              </Col>
              <Col>
                <Card.Body>
                  <Card.Title style={{ marginBottom: "20px" }}>
                    {book.volumeInfo.title}
                  </Card.Title>
                  <div style={{ lineHeight: "0.8" }}>
                    <p>
                      <strong>Published: </strong>
                      {book.volumeInfo.publishedDate
                        ? format(
                            parseISO(book.volumeInfo.publishedDate),
                            "MM/dd/yyyy"
                          )
                        : "N/A"}
                    </p>
                    <p>
                      {book.volumeInfo.authors.length > 1 ? (
                        <strong>Authors: </strong>
                      ) : (
                        <strong>Author: </strong>
                      )}
                      {book.volumeInfo.authors.map((el, id) =>
                        formatAuthor(el, id)
                      )}
                    </p>
                    <p>
                      <strong>Page Count: </strong>
                      {book.volumeInfo.pageCount
                        ? `${book.volumeInfo.pageCount} pages`
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Publisher: </strong>
                      {book.volumeInfo.publisher || "N/A"}
                    </p>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        )}
    </>
  );
};

export default BookWidget;
