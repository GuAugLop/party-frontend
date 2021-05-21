//const URL_API_EXTERNAL = "http://177.157.126.141:8080/api/v1";
const URL_API_DEV = "http://localhost:8080/api/v1";
const URL_API_PROD = "http://api-party-rs.umbler.net/api/v1";
const URL_FRONT = "http://177.157.126.141:3000/auth/reset";

const api = {
  tokenVerify: (token) => {
    return fetch(URL_API_PROD + "/token-verify", {
      method: "POST",
      headers: {
        authorization: token,
      },
    });
  },
  login: (body) => {
    return fetch(URL_API_PROD + "/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  register: (body) => {
    return fetch(URL_API_PROD + "/register", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  forgot: ({ email }) => {
    return fetch(URL_API_PROD + "/forgot", {
      method: "POST",
      body: JSON.stringify({ email, url: URL_FRONT }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  reset: (body) => {
    return fetch(URL_API_PROD + "/reset-pass", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  changeAvatar: (body) => {
    return fetch(URL_API_PROD + "/avatar", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
  },

  newPost: (body) => {
    return fetch(URL_API_PROD + "/posts", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
  },

  getPosts: () => {
    return fetch(URL_API_PROD + "/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
  },

  getPost: (id) => {
    return fetch(URL_API_PROD + "/posts/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
  },

  postComment: (body, id) => {
    return fetch(URL_API_PROD + `/posts/comments/${id}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
  },

  getComment: (id) => {
    return fetch(URL_API_PROD + `/posts/comments/${id}`, {
      method: "GET",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
  },

  getUser: (id) => {
    return fetch(URL_API_PROD + "/users/" + id, {
      method: "GET",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
  },
};

export default api;
