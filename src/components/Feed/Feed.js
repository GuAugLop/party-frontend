import React from "react";
import { Post } from "..";
import api from "../../api";

const Feed = ({ setModal }) => {
  const [error, setError] = React.useState(null);
  const [posts, setPosts] = React.useState([]);
  const limit = 6;

  const [page, setPage] = React.useState(1);
  const [infinite, setInfinite] = React.useState(true);

  React.useEffect(() => {
    let wait = false;
    const infiniteScroll = () => {
      if (infinite) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        if (scroll > height * 0.75 && !wait) {
          setPage((page) => page + 1);
          wait = true;
          setTimeout(() => {
            wait = false;
          }, 1500);
        }
      }
    };

    window.addEventListener("wheel", infiniteScroll);
    window.addEventListener("scroll", infiniteScroll);

    return () => {
      window.removeEventListener("wheel", infiniteScroll);
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getPosts = async (page) => {
    const result = await api.getPosts(page, limit);
    const json = await result.json();
    if (!result.ok) {
      setError(json.msg);
    } else {
      const newPosts = [...posts, ...json.posts];
      setPosts(newPosts);
      if (json.posts.length < limit) {
        setInfinite(false);
      }
    }
  };

  React.useEffect(() => {
    if (infinite) {
      getPosts(page);
    }
  }, [page, infinite]); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) return <p>{error}</p>;
  if (posts) {
    return (
      <>
        {posts.map((post) => (
          <Post
            id={post._id}
            key={post._id}
            desc={post.body}
            name={post.user.name}
            username={post.user.username}
            userThumb={post.user.thumb}
            img={post.thumb}
            postID={post._id}
            comments={post.comments}
            likes={post.likes}
            setModal={setModal}
          />
        ))}
        {infinite ? (
          <p>Carregando...</p>
        ) : (
          <strong>Parece que você ja viu tudo...</strong>
        )}
      </>
    );
  } else return null;
};

export default Feed;
