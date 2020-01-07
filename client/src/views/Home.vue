<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = ! drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{this.$route.name}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="info" @click.stop="dialog = true">Add Task</v-btn>
      <v-dialog v-model="dialog" persistent max-width="500px" transition="dialog-transition">
        <v-container>
          <v-row>
            <AddTask @cancelAdding="dialog = false" />
          </v-row>
        </v-container>
      </v-dialog>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" temporary></v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <v-row>
          <v-col v-for="(item, index) in deskList" :key="index" cols="12" xl="4" md="6" sm="12">
            <Desk :desk="item" />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import Desk from "../components/Desk";
import AddTask from "../components/AddTask";

export default {
  data() {
    return {
      drawer: null,
      dialog: false
    };
  },
  name: "home",
  components: {
    Desk,
    AddTask
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
</style>
