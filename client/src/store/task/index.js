import axios from "axios";
import Vue from "vue";
import db from '../../plugins/localDb'

const task = {
  namespaced: true,
  state: {
    list: [],
    localList: []
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
    getLocalTasks(state, tasks) {
      let list = sortTasks(tasks);
      Vue.set(state, "localList", list);
    },
    addLocalTask(state, task) {
      state.localList.unshift(task);
    },
    updateLocalTask(state, task) {
      let list = state.localList.filter(el => el._id !== task.id);
      list.push(task);
      list = sortTasks(list);
      Vue.set(state, "localList", list);
    },
    deleteLocalTask(state, task_id) {
      let list = state.localList.filter(el => el._id !== task_id);
      Vue.set(state, "localList", list);
    },
    clearList(state) {
      let list = state.list.filter(el => el.desk === 'local')
      Vue.set(state, 'list', list)

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
    async createTask({ commit }, task) {
      try {
        if (task.desk !== 'local') {
          let res = await axios.post("/api/tasks", task);
          commit("createTask", res.data);
          commit(
            "desk/updateDeskLocal",
            { method: "create", task: res.data },
            { root: true }
          );
        } else {
          task.createdAt = new Date( Date.now()).toISOString()
          let res = await db.tasks.add(task);
          let newtask = await db.tasks.get(res);
          commit('addLocalTask', newtask);
          commit(
            "desk/updateDeskLocal",
            { method: "create", task: newtask },
            { root: true }
          );
        }
      } catch (err) {
        console.error(err);
      }
    },
    async updateTask({ commit }, task) {
      try {
        let res = await axios.put(`/api/tasks/${task._id}`, task);
        commit("updateTask", res.data);
        commit(
          "desk/updateDeskLocal",
          { method: "update", task: res.data },
          { root: true }
        );
      } catch (err) {
        console.error(err);
      }
    },
    async deleteTask({ commit }, task) {
      try {
        await axios.delete(`/api/tasks/${task._id}`);
        commit("deleteTask", task._id);
        commit(
          "desk/updateDeskLocal",
          { method: "delete", task },
          { root: true }
        );
      } catch (err) {
        console.error(err);
      }
    },
    async getLocalTasks({ commit }) {
      try {
        let res = await db.tasks.toArray();
        console.log('res: ', res);
        commit("getTasks", res);
      } catch (error) {
        console.log(error);
      }
    },
    // async addLocalTask({ commit }, task) {
    //   try {
    //     let res = await db.tasks.add({ task });
    //     console.log(res);
    //     commit("addLocalTask", res);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async updateLocalTask({ commit }, { id, ...payload }) {
      try {
        let res = await db.tasks.update(id, payload);
        console.log(res);
        commit("updateLocalTask", res);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteLocalTask({ commit }, id) {
      try {
        await db.tasks.delete(id);
        commit("deleteLocalTask", id);
      } catch (error) {
        console.error(error);
      }
    }
  },
  getters: {
    getList: state => desk_id => state.list.filter(el => el.desk === desk_id),
    getTask: state => id => state.list.find(el => el._id === id),
    getLocalList: state => state.localList
  }
};

function sortTasks(tasks) {
  if (tasks.length > 1) {
    tasks = tasks.sort((a, b) => {
      if ((a.isDone && b.isDone) || (!a.isDone && !b.isDone)) {
        let aTime = new Date(a.createdAt).getTime();
        let bTime = new Date(b.createdAt).getTime();

        return bTime - aTime;
      } else {
        return a.isDone - b.isDone;
      }
    });
  }
  return tasks;
}

export default task;
