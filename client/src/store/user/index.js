import axios from "axios";
import Vue from "vue";

const user = {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") || "",
    error: "",
    user: JSON.parse(localStorage.getItem("user")) || {}
  },
  mutations: {
    authUser(state, responce) {
      let newToken = "Bearer " + responce.token;
      state.token = newToken;
      localStorage.setItem("token", newToken);
      let user = {
        ...responce.user
      };
      localStorage.setItem("user", JSON.stringify(user));
      Vue.set(state, "user", user);
    },

    setError(state, err) {
      state.error = err.message;
    },
    logOut(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.token = "";
      let user = { firstName: "John", lastName: "Dow", email: "anonymous" };
      Vue.set(state, "user", user);
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
    },
    async updateUser({ commit }, user) {
      try {
        const res = await axios.put(`/api/user/${user._id}`, user);
        commit("authUser", res.data);
      } catch (err) {
        console.error(err);
      }
    },
    logOut({ commit }) {
      commit("logOut");
    }
  },
  getters: {
    error: state => state.error,
    isLoggedIn: state => !!state.token,
    getUser: state => state.user
  }
};

export default user;
