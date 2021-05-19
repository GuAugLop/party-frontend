import React from "react";
import styles from "./Comment.module.css";
import avatar from "../../static/img/defaultAvatar.png";

const Comment = () => {
  return (
    <div className={styles.container}>
      <img src={avatar} alt="avatar" className={styles.avatar} />
    </div>
  );
};

export default Comment;
