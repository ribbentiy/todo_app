<template>
  <div>
    <h3>{{ title }}</h3>
    <p>{{ message }}</p>
    <input type="checkbox" :id="id" v-model="isDone" disabled />
    <label :for="id">{{ isDone ? "Done" : "Not Done" }}</label>
    <p>Expiration in: {{ expDate }}</p>
  </div>
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
    this.expDate = new Date(this.task.expDate);
    this.isDone = this.task.isDone;
  }
};
</script>

<style scoped></style>
