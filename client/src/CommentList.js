import React from "react";

/// Get list of comments for a specific post

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    // console.log(comment);
    /* Should display comment.content instead */
    return <li key={comment.id}>{comment.id}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
