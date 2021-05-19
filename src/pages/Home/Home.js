import React from "react";
import styles from "./Home.module.css";
import { Feed, PostModal } from "../../components/index";

const Home = () => {
  const [modal, setModal] = React.useState(null);
  return (
    <div className={styles.container}>
      {modal && <PostModal setModal={setModal} modal={modal} />}
      <Feed setModal={setModal} />
    </div>
  );
};

export default Home;
