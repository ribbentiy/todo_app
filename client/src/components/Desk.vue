<template>
  <v-card>
    <v-card-title primary-title>{{ desk.title }}</v-card-title>
    <v-card-text>
      <ul class="tasks-list">
        <li is="Task" v-for="task in desk.tasks" :key="task._id" :task="task"></li>
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
  }
};
</script>

<style scoped>
</style>
