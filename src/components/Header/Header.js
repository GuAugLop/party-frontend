import React from "react";
import { Button } from "..";
import { ReactComponent as Logo } from "../../static/img/logo.svg";
import moreIcon from "../../static/img/more.png";
import defaultAvatar from "../../static/img/defaultAvatar.png";
import { UserContext } from "../../UserContext";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [avatar, setAvatar] = React.useState(null);
  const { user } = React.useContext(UserContext);
  const navigate = useNavigate();
  const setAvatarFunc = React.useCallback(() => {
    if (user) {
      setAvatar(user.thumb || defaultAvatar);
    }
  }, [user]);
  React.useEffect(() => {
    setAvatarFunc();
  });

  return (
    <header className={styles.header}>
      <Link to="/">
        <Logo className={styles.logo} />
      </Link>
      <div className={styles.buttonContainer}>
        <Link to="/new">
          <Button width="29px" height="29px">
            <img src={moreIcon} alt="more" />
          </Button>
        </Link>

        <Link to={`user/${user.username}`} className={styles.avatarContainer}>
          <img
            src={avatar}
            alt="avatar"
            className={styles.avatar}
            onClick={() => navigate(`user/${user.username}`)}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
