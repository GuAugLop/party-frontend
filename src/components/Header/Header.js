import React from "react";
import { Button } from "..";
import { ReactComponent as Logo } from "../../static/img/logo.svg";
import moreIcon from "../../static/img/more.png";
import defaultAvatar from "../../static/img/defaultAvatar.png";
import { UserContext } from "../../UserContext";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [avatar, setAvatar] = React.useState(null);
  const { user } = React.useContext(UserContext);
  React.useEffect(() => {
    if (user) {
      setAvatar(user.thumb || defaultAvatar);
    }
  }, [user]);

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

        <div className={styles.avatarContainer}>
          <img src={avatar} alt="avatar" className={styles.avatar} />
        </div>
      </div>
    </header>
  );
};

export default Header;
