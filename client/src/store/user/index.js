import axios from "axios";

const user = {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") || "",
    error: "",
    user: JSON.parse(localStorage.getItem("user")) || ""
  },
  mutations: {
    authUser(state, responce) {
      let newToken = "Bearer " + responce.token;
      state.token = newToken;
      localStorage.setItem("token", newToken);
      let user = JSON.stringify(responce.user);
      localStorage.setItem("user", user);
    },

    setError(state, err) {
      state.error = err.message;
    }
  },
  actions: {
    // register user
    // post /register
    async reqisterUser({ commit }, { email, password }) {
      try {
        const res = await axios.post("/api/user/register", {
          email,
          password
        });
        commit("authUser", res.data);
      } catch (err) {
        commit("setError", err);
      }
    },

    // Auth user
    // Post /auth
    async authUser({ commit }, { email, password }) {
      try {
        const res = await axios.post("/api/user/auth", {
          email,
          password
        });
        commit("authUser", res.data);
      } catch (err) {
        commit("setError", err);
      }
    }
  },
  getters: {
    error: state => state.error,
    isLoggedIn: state => !!state.token
  }
};

export default user;
