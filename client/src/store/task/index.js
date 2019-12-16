import axios from "axios";
import Vue from "vue";

const task = {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    clearState(state) {
      Vue.set(state, "list", []);
    },
    getTasks(state, tasks) {
      this.clearState(state);
      state.list.push(...tasks);
    },
    createTask(state, task) {
      state.list.push(task);
    },
    updateTask(state, task) {
      let list = state.list.filter(el => el._id !== task._id);
      list.push(task);
      Vue.set(state, "list", list);
    },
    deleteTask(state, task_id) {
      let list = state.list.filter(el => el._id !== task_id);
      Vue.set(state, "list", list);
    }
  },
  actions: {
    async createTask({ dispatch }, task) {
      try {
        await axios.post("/api/tasks", task);
        //commit('createTask', res.data)
        dispatch("desk/getList", null, { root: true });
      } catch (err) {
        console.error(err);
      }
    },
    async updateTask({ dispatch }, task) {
      try {
        await axios.put(`/api/${task._id}`, task);
        dispatch("desk/getList", null, { root: true });
      } catch (err) {
        console.error(err);
      }
    },
    async deleteTask({ dispatch }, task_id) {
      try {
        await axios.delete(`/api/${task_id}`);
        dispatch("desk/getList", null, { root: true });
      } catch (err) {
        console.error(err);
      }
    }
  },
  getters: {}
};

export default task;
