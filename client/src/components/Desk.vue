<template>
  <div class="card">
    <div class="desk">
      <h2>{{ desk.title }}</h2>
      <ul class="tasks-list">
        <li is="Task" v-for="task in desk.tasks" :key="task._id" :task="task"></li>
      </ul>
      <BaseButton @user-click="delDesk(desk._id)">Delete</BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from "./BaseButton";
import Task from "./Task";

export default {
  components: {
    BaseButton,
    Task
  },
  name: "Desk",
  data() {
    return {};
  },
  props: ["desk"],
  methods: {
    delDesk(id) {
      this.$store.dispatch("desk/deleteDesk", id);
    }
  }
};
</script>

<style scoped>
.card {
  height: 500px;
  background-color: rgb(204, 204, 204);
  border: 2px solid rgb(104, 104, 104);
  border-radius: 10px;
}

.desk {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>
