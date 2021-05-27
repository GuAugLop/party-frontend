import React from "react";
import { useNavigate, useParams } from "react-router";
import context from "../../static/img/context.png";
import defaultAvatar from "../../static/img/defaultAvatar.png";
import styles from "./Profile.module.css";
import api from "../../api";
import { Feed, PostModal } from "../../components";

const Profile = () => {
  const { id } = useParams();
  const [modal, setModal] = React.useState(null);
  const [profile, setProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const result = await api.getUser(id);
        const json = await result.json();
        if (!result.ok || !json.user) {
          navigate("/");
          return;
        }
        setProfile(json.user);
      } catch (err) {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (loading) return <p>Carregando...</p>;
  if (profile)
    return (
      <div className={styles.container}>
        {modal && <PostModal setModal={setModal} modal={modal} />}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <img
              src={profile.thumb || defaultAvatar}
              alt=""
              className={styles.thumb}
            />
            <div className={styles.userInfo}>
              <div className={styles.userInfoHeader}>
                <div>
                  <p>{profile.name}</p>
                  <span>{profile.username}</span>
                </div>
                <img src={context} alt="context" />
              </div>
              <div className={styles.userInfoFooter}>
                <span>{profile.posts.length} Publicações</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Feed setModal={setModal} user={profile._id} />
        </div>
      </div>
    );
  else return null;
};

export default Profile;
