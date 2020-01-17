import axios from "axios";
import Vue from "vue";

const desk = {
  namespaced: true,
  state: {
    initialData: [{ title: 'Local', _id: 'local', local: true }],
    list: [{ title: 'Local', _id: 'local', local: true }]
  },
  mutations: {
    clearList(state) {
      Vue.set(state, "list", state.initialData);
    },
    getDesks(state, desks) {
      let list = [...state.list, ...desks]
      Vue.set(state, "list", list);
    },
    createDesk(state, desk) {
      state.list.push(desk);
    },
    updateDesk(state, desk) {
      let list = state.list.filter(el => el._id !== desk._id);
      list.push(desk);
      Vue.set(state, "list", list);
    },
    deleteDesk(state, id) {
      let list = state.list.filter(el => !(el._id === id));
      Vue.set(state, "list", list);
    },
    updateDeskLocal(state, options) {
      let { method, task } = options;

      if (method === "create") {
        console.log('task:', task)
        console.log(state.list.find(el => el._id === task.desk))
        state.list.find(el => el._id === task.desk).tasks.push(task._id);
      }
      if (method === "delete") {
        let deskIndex = state.list.findIndex(el => el._id === task.desk);
        let taskIndex = state.list[deskIndex].tasks.findIndex(
          el => el._id === task._id
        );
        state.list[deskIndex].tasks.splice(taskIndex, 1);
      }
      if (method === "update") {
        let newDeskIndex = state.list.findIndex(el => el._id === task.desk);

        if (!state.list[newDeskIndex].tasks.includes(task._id)) {
          let oldDeskIndex = state.list.findIndex(el =>
            el.tasks.some(el => el === task._id)
          );
          let oldTaskIndex = state.list[oldDeskIndex].tasks.findIndex(
            el => el === task._id
          );
          state.list[oldDeskIndex].tasks.splice(oldTaskIndex, 1);
          state.list[newDeskIndex].tasks.push(task._id);
        }
      }
    }
  },
  actions: {
    //Get Desk List
    //Get /api/desks/
    async getList({ commit, rootGetters }) {
      console.log(rootGetters['user/isLoggedIn'])
      commit("clearError", null, { root: true });
      commit("setLoading", null, { root: true });
      try {
        let res = await axios.get("/api/desks");
        commit("clearLoading", null, { root: true });
        commit("getDesks", res.data);
      } catch (err) {
        commit("setError", err, { root: true });
      }
    },
    //Create Desk
    //Post /api/desks/
    async createDesk({ commit }, title) {
      commit("clearError", null, { root: true });
      commit("setLoading", null, { root: true });
      try {
        let res = await axios.post("/api/desks", { title });
        commit("clearLoading", null, { root: true });
        commit("createDesk", res.data);
      } catch (err) {
        commit("setError", err, { root: true });
      }
    },
    //Update desk
    //Put /api/desks/:id
    async updateDesk({ commit }, { id, payload }) {
      commit("clearError", null, { root: true });
      commit("setLoading", null, { root: true });
      try {
        let res = await axios.put(`/api/desks/${id}`, payload);
        commit("clearLoading", null, { root: true });
        commit("updateDesk", res.data);
      } catch (err) {
        commit("setError", err, { root: true });
      }
    },
    //Delete desk
    //Delete /api/desks/:id
    async deleteDesk({ commit }, id) {
      commit("clearError", null, { root: true });
      commit("setLoading", null, { root: true });
      try {
        await axios.delete(`/api/desks/${id}`);
        commit("clearLoading", null, { root: true });
        commit("deleteDesk", id);
      } catch (err) {
        commit("setError", err, { root: true });
      }
    }
  },
  getters: {
    getList: state => state.list
  }
};

export default desk;
