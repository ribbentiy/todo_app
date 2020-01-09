<template>
  <v-card>
    <v-card-title primary-title>{{ desk.title }}</v-card-title>
    <v-card-text>
      <ul class="tasks-list">
        <li
          is="Task"
          v-for="task in taskList(desk._id)"
          :key="task._id"
          :task="task"
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
    },
    taskList(desk_id) {
      return this.$store.getters["task/getList"](desk_id);
    }
  },
  computed: {
    // taskList(desk_id) {
    //   return this.$store.getters["task/getList"](desk_id);
    // }
  }
};
</script>

<style scoped>
</style>
