<template>
  <v-form>
    <v-text-field
      label="Title"
      v-model="title"
      clearable
      :rules="titleRules"
      required
      lazy-validation
    ></v-text-field>
    <v-textarea
      label="Message"
      v-model="message"
      rows="1"
      auto-grow
      clearable
      :rules="messageRules"
      lazy-validation
      required
    ></v-textarea>
    <v-select
      :items="deskList"
      v-model="desk"
      label="Select Desk"
      item-text="title"
      item-value="_id"
      clearable
      :rules="deskRules"
      required
    ></v-select>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="expDate"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="expDate"
          label="Expiration Date"
          prepend-icon="mdi-calendar-month"
          readonly
          placeholder="Default value 2 weeks"
          v-on="on"
          clearable
        ></v-text-field>
      </template>
      <v-date-picker v-model="expDate" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
        <v-btn text color="primary" @click="$refs.menu.save(expDate)">OK</v-btn>
      </v-date-picker>
    </v-menu>
    <v-btn color="success" @click.prevent="addTask">Submit</v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      title: "",
      message: "",
      expDate: "",
      desk: "",
      titleRules: [v => !!v || "Title is required"],
      messageRules: [v => !!v || "Message is required"],
      //TODO: Need to implement Local Desk
      deskRules: [v => !!v || "Desk is required yet"]
    };
  },

  mounted() {
    //this.expDate = new Date(Date.now()).toISOString().substr(0, 10);
    if (this.$store.getters["user/isLoggedIn"]) {
      console.log("user is logged in");
    } else {
      console.log("user is not logged in");
    }
  },
  methods: {
    addTask() {
      let task = {
        title: this.title,
        message: this.message,
        isDone: false,
        desk: this.desk
      };

      if (this.expDesk) {
        task.expDesk = this.expDesk;
      }
      this.$store.dispatch("task/createTask", task);
    }
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
