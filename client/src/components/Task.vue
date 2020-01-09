<template>
  <v-card class="card" :class="isDone ? 'is-done': ''">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <p>{{ message }}</p>
      <v-checkbox :label="isDone ? 'Done': 'Not done'" v-model="isDone"></v-checkbox>

      <p>
        Expiration in:
        <em>{{ expireInToString }}</em>
      </p>
    </v-card-text>
    <v-card-actions>
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
        <EditTask :task="task" :desk_id="desk_id" @closeModal="closeModal" />
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
  props: ["task", "desk_id"],
  data() {
    return {
      id: "",
      title: "",
      message: "",
      expDate: "",
      isDone: false,
      dialog: false,
      edited: false
    };
  },
  mounted() {
    console.log(this.task);

    this.id = this.task._id;
    this.title = this.task.title;
    this.message = this.task.message;
    this.expDate = new Date(this.task.expDate).getTime();
    this.isDone = this.task.isDone;
  },
  watch: {
    isDone() {
      this.toggleDoneTask();
    },
    edited() {
      if (this.edited) {
        const { title, message, isDone, expDate } = this.$store.getters[
          "task/getTask"
        ];
        this.title = title;
        this.message = message;
        this.isDone = isDone;
        this.expDate = new Date(expDate).getTime();
        this.edited = false;
      }
    }
  },
  methods: {
    deleteTask() {
      this.$store.dispatch("task/deleteTask", this.id);
    },
    toggleDoneTask() {
      this.$store.dispatch("task/updateTask", {
        _id: this.id,
        isDone: this.isDone
      });
      this.edited = true;
    },
    closeModal(edited) {
      this.dialog = false;
      this.edited = edited;
    }
  },
  computed: {
    expireInToString() {
      let expTime = Math.floor(
        (this.expDate - new Date(Date.now()).getTime()) / 1000
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
    }
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 10px;
}
</style>
