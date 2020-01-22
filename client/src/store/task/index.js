import axios from "axios";
import Vue from "vue";
import db from "../../plugins/localDb";

const task = {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    getTasks(state, tasks) {
      let list = sortTasks([...state.list, ...tasks]);
      Vue.set(state, "list", list);
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
    clearList(state) {
      let list = state.list.filter(el => el.desk === "local");
      Vue.set(state, "list", list);
    }
  },
  actions: {
    async getList({ commit, rootGetters }) {
      commit("clearError", null, { root: true });
      commit("setLoading", null, { root: true });
      try {
        let res = [];
        if (rootGetters["user/isLoggedIn"]) {
          res = (await axios.get("/api/tasks")).data;
        }
        let resLocal = await db.tasks.toArray();
        res = [...res, ...resLocal];
        commit("getTasks", res);
      } catch (error) {
        commit("setError", error, { root: true });
      } finally {
        commit("clearLoading", null, { root: true });
      }
    },
    async createTask({ commit }, task) {
      commit("clearError", null, { root: true });
      commit("setLoading", null, { root: true });
      try {
        let res = {};
        if (task.desk !== "local") {
          res = (await axios.post("/api/tasks", task)).data;
          commit(
            "desk/updateDeskLocal",
            { method: "create", task: res },
            { root: true }
          );
        } else {
          if (!task.createdAt) {
            task.createdAt = new Date(Date.now()).toISOString();
          }
          if (!task.expDate) {
            task.expDate = new Date(
              Date.now() + 14 * 24 * 60 * 60 * 1000
            ).toISOString();
          }
          let id = await db.tasks.add(task);
          res = await db.tasks.get(id);
        }
        commit("createTask", res);
      } catch (error) {
        console.error(error);
        commit("setError", error, { root: true });
      } finally {
        commit("clearLoading", null, { root: true });
      }
    },
    async updateTask({ commit, dispatch }, task) {
      commit("clearError", null, { root: true });
      commit("setLoading", null, { root: true });
      try {
        let res = {};
        let isDeskNotChange = !task.oldDesk;
        let isNewDeskNotLocal = task.desk !== "local";
        let isOldDeskNotLocal = task.oldDesk !== "local";
        if (isDeskNotChange || (isNewDeskNotLocal && isOldDeskNotLocal)) {
          if (task.desk !== "local") {
            res = (await axios.put(`/api/tasks/${task._id}`, task)).data;
            task.oldDesk ? (res.oldDesk = task.oldDesk) : undefined;
            commit(
              "desk/updateDeskLocal",
              { method: "update", task: res },
              { root: true }
            );
          } else {
            let { _id, ...payload } = task;
            await db.tasks.update(_id, payload);
            res = await db.tasks.get(_id);
          }
          commit("updateTask", res);
        } else {
          let { _id, oldDesk, ...payload } = task;
          dispatch("createTask", payload);
          dispatch("deleteTask", { _id, desk: oldDesk });
        }
      } catch (error) {
        console.error(error);
        commit("setError", error, { root: true });
      } finally {
        commit("clearLoading", null, { root: true });
      }
    },
    async deleteTask({ commit }, task) {
      commit("clearError", null, { root: true });
      commit("setLoading", null, { root: true });
      try {
        if (task.desk !== "local") {
          await axios.delete(`/api/tasks/${task._id}`);
          commit(
            "desk/updateDeskLocal",
            { method: "delete", task },
            { root: true }
          );
        } else {
          await db.tasks.delete(task._id);
        }
        commit("deleteTask", task._id);
      } catch (error) {
        commit("setError", error, { root: true });
      } finally {
        commit("clearLoading", null, { root: true });
      }
    }
  },
  getters: {
    getList: state => desk_id => state.list.filter(el => el.desk === desk_id),
    getTask: state => id => state.list.find(el => el._id === id)
  }
};

function sortTasks(tasks) {
  if (tasks.length > 1) {
    tasks = tasks.sort((a, b) => {
      let aTime = new Date(a.createdAt).getTime();
      let bTime = new Date(b.createdAt).getTime();
      return bTime - aTime;
    });
  }
  return tasks;
}

export default task;
