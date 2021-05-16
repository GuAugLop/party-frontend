const URL_API = "http://localhost:8080/api/v1";
const URL_FRONT = "http://localhost:3000/auth/reset";

const api = {
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
};

export default api;
