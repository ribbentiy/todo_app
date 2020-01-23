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
      <v-btn
        color="info"
        @click.stop="addTaskDialog = true"
        :open="addDeskDialog"
        >Add Task</v-btn
      >
      <v-dialog
        v-model="addTaskDialog"
        scrollable
        max-width="500px"
        transition="dialog-transition"
      >
        <AddTask @closeModal="addTaskDialog = false" />
      </v-dialog>
    </v-app-bar>

    <v-content>
      <v-container fluid  class="content-wrap">
        <v-row class="container-inner">
          <v-col
            v-for="(item, index) in deskList"
            :key="index"

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
  methods: {},
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
  .container-inner {
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
    justify-content: space-between;
    height: calc(100vh - 88px);
  }

  .board {
    min-width: 350px;
  }

  .content-wrap {
    box-sizing: border-box;

  }

</style>
