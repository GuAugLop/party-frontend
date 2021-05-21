import React from "react";
import defaultAvatar from "../../static/img/defaultAvatar.png";
import context from "../../static/img/context.png";
import comment from "../../static/img/comment.png";
//import like from "../../static/img/like.png";
import liked from "../../static/img/liked.png";
import styles from "./Post.module.css";
import api from "../../api";

const Post = ({
  img,
  desc,
  name,
  userThumb,
  username,
  postID,
  setModal,
  comments,
}) => {
  async function getPost(id) {
    const result = await api.getPost(id);
    const json = await result.json();
    if (!result.ok) {
      return;
    }
    setModal(json);
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerPost}>
        <div className={styles.profileHeader}>
          <img
            src={userThumb || defaultAvatar}
            alt="avatar"
            className={styles.avatar}
          />
          <div>
            <p>{name}</p>
            <small>{username}</small>
          </div>
        </div>
        <img src={context} className={styles.context} alt="context" />
      </div>
      <p className={styles.desc}>{desc}</p>
      <img
        className={styles.thumb}
        alt="Pub"
        src={img}
        onClick={() => getPost(postID)}
      />
      <div className={styles.footerPost}>
        <div>
          <img src={liked} alt="Like" />
          <img src={comment} alt="comment" onClick={() => getPost(postID)} />
        </div>
        <p>46 Curtidas | {comments.length} comentários</p>
      </div>
    </div>
  );
};

export default Post;
