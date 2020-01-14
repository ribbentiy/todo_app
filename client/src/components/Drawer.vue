<template>
  <div>
    <v-list>
      <v-list-item-group>
        <v-list-item link class="mt-4">
          <v-list-item-content>
            <v-list-item-title
              class="title"
              v-if="!!user.firstName"
            >{{user.firstName + ' ' + user.lastName.toUpperCase()}}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-divider></v-divider>
    <v-list nav>
      <v-list-item-group v-model="item">
        <v-list-item v-for="(item, i) in items" :key="i">{{item.text}}</v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "Drawer",
  data() {
    return {
      item: 0,
      items: [{ text: "Home", path: "/" }]
    };
  },

  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    }
  }
};
</script>

<style>
</style>