<template>
  <div class="home">
    <div class="container">
      <Desk v-for="(item, index) in deskList" :desk="item" :key="index" />
    </div>
  </div>
</template>

<script>
import Desk from "../components/Desk";
export default {
  name: "home",
  components: {
    Desk
  },
  created() {
    this.$store.dispatch("desk/getList");
  },

  computed: {
    deskList() {
      return this.$store.getters["desk/getList"];
    }
  }
};
</script>

<style>
body {
  min-width: 900px;
  font-family: Arial, Helvetica, sans-serif;
}
.home > .container {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
