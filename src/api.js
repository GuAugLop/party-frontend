const URL_API = "http://localhost:8080/api/v1";
const URL_FRONT = "http://localhost:3000/auth/reset";

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

  getPosts: () => {
    return fetch(URL_API + "/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
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
};

export default api;
