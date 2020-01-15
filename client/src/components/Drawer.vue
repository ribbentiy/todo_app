<template>
  <div>
    <v-list>
      <v-list-group class="mt-4" v-model="userMenu">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-content>
              <v-list-item-title class="title">{{
                (user.firstName || "John") +
                  " " +
                  (user.lastName || "Dow").toUpperCase()
              }}</v-list-item-title>
              <v-list-item-subtitle v-if="isLoggedIn">{{
                user.email
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item-content>
        </template>
        <v-list-item v-if="isLoggedIn" @click="profileModal = true">
          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-dialog
          v-model="profileModal"
          scrollable
          persistent
          max-width="500px"
          transition="dialog-transition"
        >
          <Profile @closeModal="profileModal = false" />
        </v-dialog>
        <v-list-item v-if="isLoggedIn" @click="logOut">
          <v-list-item-content>
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-else @click="loginModal = true">
          <v-list-item-content>
            <v-list-item-title>Sign in/up</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-dialog
          v-model="loginModal"
          scrollable
          persistent
          max-width="500px"
          transition="dialog-transition"
        >
          <LoginForm @closeModal="loginModal = false" />
        </v-dialog>
      </v-list-group>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item-group v-model="item">
        <v-list-item v-for="(item, i) in items" :key="i">{{
          item.text
        }}</v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import Profile from "@/components/Profile.vue";
import LoginForm from "@/components/LoginForm.vue";

export default {
  components: {
    Profile,
    LoginForm
  },
  name: "Drawer",
  data() {
    return {
      userMenu: 0,
      profileModal: false,
      loginModal: false,
      item: 0,
      items: [{ text: "Home", path: "/" }]
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch("user/logOut");
    }
  },
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    },
    isLoggedIn() {
      return this.$store.getters["user/isLoggedIn"];
    }
  }
};
</script>

<style></style>
