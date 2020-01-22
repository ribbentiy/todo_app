<template>
  <v-card :color="desk.local ? 'grey lighten-2' : ''">
    <v-card-title primary-title>
      {{ desk.title }}
      <v-spacer/>
      <v-btn v-if="!desk.local && taskList.length === 0" color="red" dark fab small @click.stop="dialog = true">
        <v-icon>mdi-trash-can</v-icon>
      </v-btn>
      <v-dialog
        v-model="dialog"
        scrollable
        max-width="500px"
        transition="dialog-transition">
        <DelDeskDialog :desk="desk" @closeModal="dialog = false"/>
      </v-dialog>
    </v-card-title>
    <v-card-text>
      <ul class="tasks-list">
        <li
          is="Task"
          v-for="task in taskList"
          :key="task._id"
          :task_id="task._id"
          :desk_id="desk._id"
        />
      </ul>
    </v-card-text>
  </v-card>
</template>

<script>
import Task from "./Task";
import DelDeskDialog from "./DelDeskDialog";

export default {
  components: {
    Task,
    DelDeskDialog
  },
  name: "Desk",
  data() {
    return {
      dialog: false
    };
  },
  props: ["desk"],
  methods: {

  },
  computed: {
    taskList() {
      return this.$store.getters["task/getList"](this.desk._id);
    }
  }
};
</script>

<style scoped></style>
