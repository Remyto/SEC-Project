import React, { useState, useEffect } from "react";
import axios from "axios";

/// Get list of comments for a specific post

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    /// Make request to Comments microservice
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );

    setComments(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty array so that useEffect only runs the function once

  const renderedComments = comments.map((comment) => {
    // console.log(comment);
    /* Should display comment.content instead */
    return <li key={comment.id}>{comment.id}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
