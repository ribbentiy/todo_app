<template>
  <div>
    <v-navigation-drawer app v-model="drawer" clipped>
      <Drawer />
    </v-navigation-drawer>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ this.$route.name }}</v-toolbar-title>
      <v-spacer />
      <v-btn
        color="info"
        @click.stop="addDeskDialog = true"
        v-if="isLoggedIn"
        class="mr-4"
        >Add Desk</v-btn
      >
      <v-dialog
        v-model="addDeskDialog"
        scrollable
        max-width="500px"
        transition="dialog-transition"
      >
        <v-container>
          <AddDesk @closeModal="addDeskDialog = false" />
        </v-container>
      </v-dialog>
      <v-btn color="info" @click.stop="addTaskDialog = true">Add Task</v-btn>
      <v-dialog
        v-model="addTaskDialog"
        scrollable
        max-width="500px"
        transition="dialog-transition"
      >
        <v-container>
          <v-row>
            <AddTask @closeModal="addTaskDialog = false" />
          </v-row>
        </v-container>
      </v-dialog>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-row>
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
import AddDesk from "../components/AddDesk";

export default {
  data() {
    return {
      drawer: null,
      addTaskDialog: false,
      addDeskDialog: false
    };
  },
  name: "home",
  components: {
    Desk,
    AddTask,
    Drawer,
    AddDesk
  },
  mounted() {
    this.$store
      .dispatch("desk/getList")
      .then(() => this.$store.dispatch("task/getList"));
  },

  computed: {
    deskList() {
      return this.$store.getters["desk/getList"];
    },
    isLoggedIn() {
      return this.$store.getters["user/isLoggedIn"];
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
