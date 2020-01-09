import axios from "axios";
import Vue from "vue";

const task = {
  namespaced: true,
  state: {
    list: [],
    task: {}
  },
  mutations: {
    getTasks(state, tasks) {
      let list = sortTasks(tasks);
      Vue.set(state, "list", list);
      console.log(state.list);
    },
    getTask(state, task) {
      Vue.set(state, "task", task);
    },
    createTask(state, task) {
      state.list.unshift(task);
    },
    updateTask(state, task) {
      let list = state.list.filter(el => el._id !== task._id);
      list.push(task);
      list = sortTasks(list);
      Vue.set(state, "list", list);
    },
    deleteTask(state, task_id) {
      let list = state.list.filter(el => el._id !== task_id);
      Vue.set(state, "list", list);
    },
    selectTask(state, task) {
      Vue.set(state, "task", task);
    }
  },
  actions: {
    async getList({ commit }) {
      try {
        let res = await axios.get("/api/tasks");
        commit("getTasks", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getTask({ commit }, id) {
      try {
        const res = await axios.get(`/api/tasks/${id}`);
        commit("getTask", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    async createTask({ commit, dispatch }, task) {
      try {
        let res = await axios.post("/api/tasks", task);
        commit("createTask", res.data);
        dispatch("desk/createTaskLocal", res.data, { root: true });
      } catch (err) {
        console.error(err);
      }
    },
    async updateTask({ commit }, task) {
      try {
        let res = await axios.put(`/api/tasks/${task._id}`, task);
        commit("selectTask", res.data);
        commit("updateTask", res.data);
      } catch (err) {
        console.error(err);
      }
    },
    async deleteTask({ dispatch }, task_id) {
      try {
        await axios.delete(`/api/tasks/${task_id}`);
        dispatch("desk/getList", null, { root: true });
      } catch (err) {
        console.error(err);
      }
    }
  },
  getters: {
    getList: state => desk_id => state.list.filter(el => el.desk === desk_id),
    getTask: state => state.task
  }
};

function sortTasks(tasks) {
  if (tasks.length > 1) {
    tasks = tasks.sort((a, b) => {
      if ((a.isDone && b.isDone) || (!a.isDone && !b.isDone)) {
        let aTime = new Date(a.createdAt).getTime();
        let bTime = new Date(b.createdAt).getTime();

        return aTime - bTime;
      } else {
        return a.isDone - b.isDone;
      }
    });
  }
  return tasks;
}

export default task;
