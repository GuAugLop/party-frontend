import React from "react";
import { Button } from "..";
import logo from "../../static/img/logo.svg";
import moreIcon from "../../static/img/more.png";
import defaultAvatar from "../../static/img/defaultAvatar.jpg";
import { UserContext } from "../../UserContext";
import styles from "./Header.module.css";

const Header = () => {
  const [avatar, setAvatar] = React.useState(null);
  const { user } = React.useContext(UserContext);
  React.useEffect(() => {
    console.log(user.thumb);
    setAvatar(user.thumb || defaultAvatar);
  }, [user.thumb]);

  return (
    <header className={styles.header}>
      <img src={logo} alt="Party" className={styles.logo} />
      <div className={styles.buttonContainer}>
        <Button width="29px" height="29px">
          <img src={moreIcon} alt="more" />
        </Button>
        <div className={styles.avatarContainer}>
          <img src={avatar} alt="avatar" className={styles.avatar} />
        </div>
      </div>
    </header>
  );
};

export default Header;
