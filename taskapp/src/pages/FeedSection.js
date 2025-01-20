import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  createUserFeedRequest,
  getAllUserFeedRequest,
} from "../redux/reduxSlice/userSlice";
import DisplayFeeds from "../components/DisplayFeeds";

const FeedSection = () => {
  const [userFeeds, setUserFeeds] = useState([]);
  const [description, setDescription] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const dispatch = useDispatch();
  const fileInputRef = useRef();

  const allFeeds = useSelector((state) => state.user.feeds.feeds);

  console.log("------------all feeds", allFeeds);

  useEffect(() => {
    dispatch(getAllUserFeedRequest());
  }, [dispatch]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const createUserFeed = (e) => {
    e.preventDefault();
    if (!description.trim() || !profileImage) {
      alert("Please add a description and select an image.");
      return;
    }
    setUserFeeds([...userFeeds, { description, profileImage }]);
    setDescription("");
    setProfileImage(null);
    setProfileImagePreview("");
    fileInputRef.current.value = ""; // Reset file input
    console.log("----user feed section", profileImage);
    dispatch(createUserFeedRequest({ description, profileImage }));
  };

  return (
    <div>
      <Header />
      <div className="user-create-feed-section-container">
        <Form onSubmit={createUserFeed}>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Add description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Label>Select images</Form.Label>
            <Form.Control
              type="file"
              size="sm"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </Form.Group>
          {profileImagePreview && (
            <img src={profileImagePreview} alt="Preview" width="100" />
          )}
          <Button variant="primary" type="submit">
            Create feed
          </Button>
        </Form>
      </div>
      <div>
        <DisplayFeeds feeds={allFeeds} />
      </div>
    </div>
  );
};

export default FeedSection;
