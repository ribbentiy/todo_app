import axios from "axios";

const user = {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") || "",
    error: ""
  },
  mutations: {
    setToken(state, token) {
      let newToken = "Bearer " + token;
      state.token = newToken;
      localStorage.setItem("token", newToken);
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
        commit("setToken", res.data.token);
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
        commit("setToken", res.data.token);
      } catch (err) {
        commit("setError", err);
      }
    }
  },
  getters: {
    error: state => state.error
  }
};

export default user;
