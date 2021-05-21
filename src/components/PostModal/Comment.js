import React from "react";
import styles from "./Comment.module.css";

const Comment = ({ comment }) => {
  return (
    <li className={styles.container}>
      <img src={comment.user.thumb} alt="avatar" className={styles.avatar} />
      <div className={styles.comment}>
        <p>{comment.user.username}:</p>
        <p>{comment.body}</p>
      </div>
    </li>
  );
};

export default Comment;
