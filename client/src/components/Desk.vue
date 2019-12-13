<template>
  <div class="card">
    <div class="desk">
      {{ desk.title }}
      <BaseButton @user-click="delDesk(desk._id)">Delete</BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from "./BaseButton";

export default {
  components: {
    BaseButton
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
  width: 200px;
  height: 500px;
  background-color: rgb(204, 204, 204);
  border: 2px solid rgb(104, 104, 104);
  border-radius: 10px;
}
</style>