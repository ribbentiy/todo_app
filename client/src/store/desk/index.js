import axios from "axios";
import Vue from "vue";

const desk = {
  namespaced: true,
  state: {
    list: [],
    error: ""
  },
  mutations: {
    getDesks(state, desks) {
      Vue.set(state, "list", desks);
      state.error = "";
    },
    createDesk(state, desk) {
      state.list.push(desk);
      state.error = "";
    },
    updateDesk(state, desk) {
      let list = state.list.filter(el => el._id !== desk._id);
      list.push(desk);
      Vue.set(state, "list", list);
      state.error = "";
    },
    deleteDesk(state, id) {
      let list = state.list.filter(el => !(el._id === id));
      Vue.set(state, "list", list);
      state.error = "";
    },
    setError(state, err) {
      console.error(err);
      state.error = err.message;
    }
  },
  actions: {
    //Get Desk List
    //Get /api/desks/
    async getList({ commit }) {
      try {
        let res = await axios.get("/api/desks");
        let tasks = [];
        res.data.map(el => tasks.push(...el.tasks));
        commit("getDesks", res.data);
        commit("task/getTasks", tasks, { root: true });
      } catch (err) {
        commit("setError", err);
      }
    },
    //Create Desk
    //Post /api/desks/
    async createDesk({ commit }, title) {
      try {
        let res = await axios.post("/api/desks", { title });
        commit("createDesk", res.data);
      } catch (err) {
        commit("setError", err);
      }
    },
    //Update desk
    //Put /api/desks/:id
    async updateDesk({ commit }, { id, payload }) {
      try {
        let res = axios.put(`/api/desks/${id}`, payload);
        commit("updateDesk", res.data);
      } catch (err) {
        commit("setError", err);
      }
    },
    //Delete desk
    //Delete /api/desks/:id
    async deleteDesk({ commit }, id) {
      try {
        await axios.delete(`/api/desks/${id}`);
        commit("deleteDesk", id);
      } catch (err) {
        commit("setError", err);
      }
    }
  },
  getters: {
    getList: state => state.list
  }
};

export default desk;
