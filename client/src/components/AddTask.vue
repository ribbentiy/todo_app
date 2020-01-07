<template>
  <v-card>
    <v-card-title primary-title>Add Task</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Title"
              v-model="title"
              clearable
              :rules="titleRules"
              required
              lazy-validation
            ></v-text-field>
          </v-col>
          <v-col cols="12">
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
          </v-col>
          <v-col cols="12" sm="6">
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
          </v-col>
          <v-col cols="12" sm="6">
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
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn color="success" @click.prevent="addTask">Submit</v-btn>
      <v-btn color="warning" @click.prevent="cancelAdding">Cancel</v-btn>
    </v-card-actions>
  </v-card>
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
      this.$store
        .dispatch("task/createTask", task)
        .then(() => this.cancelAdding());
    },
    cancelAdding() {
      this.title = "";
      this.message = "";
      this.expDate = "";
      this.desk = "";
      this.$emit("cancelAdding");
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
