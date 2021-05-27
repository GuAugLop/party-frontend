const URL_API = process.env.REACT_APP_URL_API;
const URL_FRONT = "https://partyrs.herokuapp.com/auth/reset";

const api = {
  tokenVerify: (token) => {
    return fetch(URL_API + "/token-verify", {
      method: "POST",
      headers: {
        authorization: token,
      },
    });
  },
  login: (body) => {
    return fetch(URL_API + "/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  register: (body) => {
    return fetch(URL_API + "/register", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  forgot: ({ email }) => {
    return fetch(URL_API + "/forgot", {
      method: "POST",
      body: JSON.stringify({ email, url: URL_FRONT }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  reset: (body) => {
    return fetch(URL_API + "/reset-pass", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  changeAvatar: (body) => {
    return fetch(URL_API + "/avatar", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
  },

  newPost: (body) => {
    return fetch(URL_API + "/posts", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
  },

  getPosts: (page, limit, user) => {
    return fetch(
      URL_API + `/posts?page=${page}&limit=${limit}&user=${user || ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      }
    );
  },

  getPost: (id) => {
    return fetch(URL_API + "/posts/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
  },

  postComment: (body, id) => {
    return fetch(URL_API + `/posts/comments/${id}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
  },

  getComment: (id) => {
    return fetch(URL_API + `/posts/comments/${id}`, {
      method: "GET",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
  },

  postLike: (id) => {
    return fetch(URL_API + `/posts/like/${id}`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
  },

  getUser: (id) => {
    return fetch(URL_API + "/users/" + id, {
      method: "GET",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
  },
};

export default api;
