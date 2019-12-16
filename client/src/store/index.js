import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import desk from "./desk";
import task from "./task";
import axios from "axios";

Vue.use(Vuex);

axios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token;

  return config;
});

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    desk,
    task
  }
});
