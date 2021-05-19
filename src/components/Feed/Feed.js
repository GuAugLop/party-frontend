import React from "react";
import { Post } from "..";
import api from "../../api";

const Feed = ({ setModal }) => {
  const [error, setError] = React.useState(null);
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const getPosts = async () => {
      const result = await api.getPosts();
      const json = await result.json();
      if (!result.ok) {
        setError(json.msg);
      } else {
        const newPosts = [...json.posts, ...posts];
        setPosts(newPosts);
      }
    };
    getPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) return <p>{error}</p>;
  if (posts) {
    return posts.map((post) => (
      <Post
        key={post._id}
        desc={post.body}
        name={post.user.name}
        username={post.user.username}
        userThumb={post.user.thumb}
        img={post.thumb}
        postID={post._id}
        setModal={setModal}
      />
    ));
  } else return null;
};

export default Feed;
