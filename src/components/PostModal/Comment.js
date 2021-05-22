import React from "react";
import styles from "./Comment.module.css";
import defaultAvatar from "../../static/img/defaultAvatar.png";

const Comment = ({ comment }) => {
  return (
    <li className={styles.container}>
      <img
        src={comment.user.thumb || defaultAvatar}
        alt="avatar"
        className={styles.avatar}
      />
      <div className={styles.comment}>
        <p>{comment.user.username}:</p>
        <p>{comment.body}</p>
      </div>
    </li>
  );
};

export default Comment;
