<template>
  <v-card>
    <v-card-title primary-title>{{ desk.title }}</v-card-title>
    <v-card-text>
      <ul class="tasks-list">
        <li
          is="Task"
          v-for="task in taskList"
          :key="task._id"
          :task_id="task._id"
          :desk_id="desk._id"
        ></li>
      </ul>
      <v-btn color="error" @click.stop="delDesk(desk._id)">Delete</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import Task from "./Task";

export default {
  components: {
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
  },
  computed: {
    taskList() {
      return this.$store.getters["task/getList"](this.desk._id);
    }
  }
};
</script>

<style scoped>
</style>
