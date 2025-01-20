import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const DisplayFeeds = ({ feeds }) => {
  //   console.log("-----------122333333", feeds);
  return (
    <div style={{ padding: "20px" }}>
      {" "}
      <Row xs={3} md={4} sm={1} className="g-4">
        {feeds &&
          feeds.map((feed, idx) => (
            <Col key={idx}>
              <Card>
                <Card.Img variant="top" src={feed.image.url} />
                <Card.Body>
                  <Card.Title>Description</Card.Title>
                  <Card.Text>{feed.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <div>
                    <strong> CreatedAt:</strong>{" "}
                    {new Date(feed.createdAt).toLocaleString()}
                  </div>
                  <div>
                    <strong>User Name:</strong> {feed.user.name}
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default DisplayFeeds;
