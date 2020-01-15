<template>
  <div>
    <v-navigation-drawer app v-model="drawer" clipped>
      <Drawer />
    </v-navigation-drawer>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ this.$route.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="info" @click.stop="dialog = true">Add Task</v-btn>
      <v-dialog
        v-model="dialog"
        scrollable
        persistent
        max-width="500px"
        transition="dialog-transition"
      >
        <v-container>
          <v-row>
            <AddTask @cancelAdding="dialog = false" />
          </v-row>
        </v-container>
      </v-dialog>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-row>
          <v-col cols="12" xl="4" md="6" sm="6" class="board">
            <Desk :desk="localDesk" />
          </v-col>
          <v-col
            v-for="(item, index) in deskList"
            :key="index"
            cols="12"
            xl="4"
            md="6"
            sm="6"
            class="board"
          >
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
import Drawer from "../components/Drawer";

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
    AddTask,
    Drawer
  },
  mounted() {
    if (this.$store.getters["user/isLoggedIn"]) {
      this.$store
        .dispatch("desk/getList")
        .then(this.$store.dispatch("task/getList"));
    }
  },
  computed: {
    deskList() {
      return this.$store.getters["desk/getList"];
    },
    localDesk() {
      return {
        title: "Local Desk",
        local: true,
        tasks: this.$store.getters["task/getLocalList"].map(el => el._id)
      };
    }
  }
};
</script>

<style>
/* .board {
  height: 100vh;
  overflow: auto;
} */
</style>
