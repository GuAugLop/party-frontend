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
  const [showMore, setShowMore] = React.useState({
    show: false,
  });
  const descRef = React.useRef();
  React.useEffect(() => {
    if (desc && desc.length > 300) {
      setShowMore({
        show: true,
        text: "Ver mais...",
      });
      descRef.current.style.whiteSpace = "nowrap";
    }
  }, [desc]);

  const showMoreFunc = () => {
    if (descRef.current.style.whiteSpace === "nowrap") {
      descRef.current.style.whiteSpace = "unset";
      setShowMore({ show: true, text: "Mostrar menos" });
    } else {
      descRef.current.style.whiteSpace = "nowrap";
      setShowMore({
        show: true,
        text: "Ver mais...",
      });
    }
  };

  async function getPost(id) {
    try {
      const result = await api.getPost(id);
      const json = await result.json();
      if (!result.ok) {
        return;
      }
      setModal(json);
    } catch (err) {
      console.log(err);
    }
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
      {desc && (
        <p ref={descRef} onClick={showMoreFunc} className={styles.desc}>
          {desc}
        </p>
      )}
      {showMore.show && (
        <p onClick={showMoreFunc} className={styles.showMore}>
          {showMore.text}
        </p>
      )}
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
