import React from "react";
import styles from "./PostModal.module.css";
import sendIcon from "../../static/img/sendIcon.png";
import { Input } from "../index";
import Comment from "./Comment";
import useForm from "../../hooks/useForm";
import api from "../../api";

const PostModal = ({ setModal, modal }) => {
  const [comments, setComments] = React.useState(() => modal.post.comments);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const list = React.useRef();

  React.useEffect(() => {
    list.current.scrollTop = list.current.scrollHeight;
  }, [modal]);

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      if (!input.trim()) {
        return;
      }
      const result = await api.postComment({ message: input }, modal.post._id);

      if (!result.ok) {
        return;
      }

      const newComments = await api.getComment(modal.post._id);
      const json = await newComments.json();
      setInput("");
      setComments(json.comments);
      list.current.scrollTop = list.current.scrollHeight;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div onClick={() => setModal(null)} className={styles.background}></div>
      <div className={styles.modalContainer}>
        <img src={modal.post.thumb} className={styles.thumb} alt="thumb" />

        <div className={styles.content}>
          <div>
            <div className={styles.headerContent}>
              <button
                onClick={() => setModal(null)}
                className={styles.closeButton}
              >
                x
              </button>
              <img
                src={modal.post.user.thumb}
                className={styles.avatar}
                alt="avatar"
              />
              <div style={{ marginLeft: "10px" }}>
                <p>{modal.post.user.name}</p>
                <small>{modal.post.user.username}</small>
              </div>
            </div>
            <div className={styles.comments} ref={list}>
              <ul className={styles.listComments}>
                {comments.map((comment) => {
                  return <Comment key={comment._id} comment={comment} />;
                })}
              </ul>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className={styles.inputContainer}>
              <Input
                label="Digite um comentario"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <button
                style={{ border: "none", background: "none" }}
                disabled={loading ? true : false}
              >
                <img src={sendIcon} alt="" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostModal;
