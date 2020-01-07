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
      <v-btn color="info" fab x-small>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn color="red" dark fab x-small @click.stop="deleteTask()">
        <v-icon>mdi-trash-can</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Task",
  props: ["task"],
  data() {
    return {
      id: "",
      title: "",
      message: "",
      expDate: "",
      isDone: false
    };
  },
  mounted() {
    this.id = this.task._id;
    this.title = this.task.title;
    this.message = this.task.message;
    this.expDate = new Date(this.task.expDate).getTime();
    this.isDone = this.task.isDone;
  },
  watch: {
    isDone() {
      this.$store.dispatch("task/updateTask", {
        id: this.id,
        isDone: this.isDone
      });
    }
  },
  methods: {
    deleteTask() {
      this.$store.dispatch("task/deleteTask", this.id);
    },
    toggleDoneTask() {
      this.$store.dispatch("task/updateTask", {
        id: this.id,
        isDone: this.isDone
      });
    }
  },
  computed: {
    expireInToString() {
      let expTime = Math.floor(
        (new Date(Date.now()).getTime() - this.expDate) / 1000
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
