<template>
  <v-card class="card" :color="isDone ? 'green lighten-4' : late ? 'red lighten-4' : ''">
    <v-card-title @click="expanded = !expanded">{{ task.title }}</v-card-title>

    <v-card-text v-show="expanded">
      <p>{{ task.message }}</p>
      <v-checkbox :label="isDone ? 'Done': 'Not done'" v-model="isDone"></v-checkbox>

      <p>
        Expiration in:
        <em>{{ expireInToString }}</em>
      </p>
    </v-card-text>
    <v-card-actions v-show="expanded">
      <v-btn color="info" fab x-small @click.stop="dialog = true">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-dialog
        v-model="dialog"
        scrollable
        persistent
        max-width="500px"
        transition="dialog-transition"
      >
        <EditTask
          :task_id="task_id"
          :open="dialog"
          :desk_id="desk_id"
          @closeModal="dialog = false"
        />
      </v-dialog>
      <v-btn color="red" dark fab x-small @click.stop="deleteTask()">
        <v-icon>mdi-trash-can</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import EditTask from "./EditTask";
export default {
  components: {
    EditTask
  },
  name: "Task",
  props: ["task_id", "desk_id"],
  data() {
    return {
      dialog: false,
      expanded: false
    };
  },

  methods: {
    deleteTask() {
      this.$store.dispatch("task/deleteTask", {
        _id: this.task_id,
        desk: this.desk_id
      });
    },
    closeModal() {
      this.dialog = false;
    }
  },
  computed: {
    expireInToString() {
      let expTime = Math.floor(
        (new Date(this.task.expDate).getTime() -
          new Date(Date.now()).getTime()) /
          1000
      );
      if (expTime < 0) {
        return "Late for: " + Math.floor(-expTime / 86400) + " days";
      }
      if (expTime / 86400 > 1) {
        let days = Math.floor(expTime / 86400);
        return "Days left: " + days;
      } else {
        return "Less than one day left";
      }
    },
    late() {
      return (
        !this.isDone &&
        Math.floor(
          (new Date(this.task.expDate).getTime() -
            new Date(Date.now()).getTime()) /
            1000
        ) < 0
      );
    },
    task() {
      return this.$store.getters["task/getTask"](this.task_id);
    },
    isDone: {
      get() {
        return this.task.isDone;
      },
      set(e) {
        this.$store.dispatch("task/updateTask", {
          _id: this.task_id,
          isDone: e
        });
      }
    }
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 10px;
}
</style>
