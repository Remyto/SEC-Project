import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

/// Get a list of all the posts that have ever been created

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  /// Store list of post
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    /// Request to the posts service
    const res = await axios.get("http://localhost:4000/posts");

    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []); // Empty arrray so that useEffect only runs the function once

  // console.log(posts);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          {/* Should be {post.title} */}
          <h3>{post.title.title}</h3>
          <CommentList postId={post.id}/>
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex felx-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};
