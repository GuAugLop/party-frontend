import React from "react";
import defaultAvatar from "../../static/img/defaultAvatar.png";
import context from "../../static/img/context.png";
import { ReactComponent as Comment } from "../../static/img/comment.svg";
import { ReactComponent as LikeIcon } from "../../static/img/like.svg";
import { ReactComponent as LikedIcon } from "../../static/img/liked.svg";
import styles from "./Post.module.css";
import api from "../../api";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router";

const Post = ({
  id,
  img,
  desc,
  name,
  userThumb,
  username,
  postID,
  setModal,
  comments,
  likes,
}) => {
  const [like, setLike] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(0);
  const { user } = React.useContext(UserContext);
  const navigate = useNavigate();
  const [showMore, setShowMore] = React.useState({
    show: false,
  });

  const postLike = async () => {
    try {
      setLike(!like);
      const result = await api.postLike(id);
      const json = await result.json();
      if (!result.ok) {
        return;
      }

      if (json.post.likes.find((id) => id === user._id)) {
        setLikeCount(json.post.likes.length);
      } else {
        setLikeCount(json.post.likes.length);
      }
    } catch (err) {
      return;
    }
  };

  React.useEffect(() => {
    if (likes.find((id) => id === user._id)) {
      setLike(true);
      setLikeCount(likes.length);
    } else {
      setLike(false);
      setLikeCount(likes.length);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      setModal(null);
      return;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerPost}>
        <div className={styles.profileHeader}>
          <img
            onClick={() => navigate(`/user/${username}`)}
            src={userThumb || defaultAvatar}
            alt="avatar"
            className={styles.avatar}
          />
          <div onClick={() => navigate(`/user/${username}`)}>
            <p>{name}</p>
            <small>{username}</small>
          </div>
        </div>
        <img src={context} className={styles.context} alt="context" />
      </div>
      {desc && (
        <p
          ref={descRef}
          onClick={showMore.show ? showMoreFunc : () => {}}
          className={styles.desc}
        >
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
          {like ? (
            <LikedIcon onClick={postLike} />
          ) : (
            <LikeIcon onClick={postLike} />
          )}
          <Comment onClick={() => getPost(postID)} />
        </div>
        <p>
          {likeCount} Curtidas | {comments.length} comentários
        </p>
      </div>
    </div>
  );
};

export default Post;
