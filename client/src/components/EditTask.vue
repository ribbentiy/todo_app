<template>
  <v-card>
    <v-card-title primary-title>Edit Task</v-card-title>
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
            <v-textarea label="Message" v-model="message" rows="1" auto-grow clearable></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-checkbox :label="isDone ? 'Done': 'Not done'" v-model="isDone"></v-checkbox>
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
      <v-btn color="primary" @click.prevent="editTask">Submit</v-btn>
      <v-btn color="secondary" @click.prevent="$emit('closeModal', false)">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["task", "desk_id"],

  data() {
    return {
      menu: false,
      title: "",
      message: "",
      expDate: "",
      desk: "",
      isDone: false,
      titleRules: [v => !!v || "Title is required"],
      deskRules: [v => !!v || "Desk is required yet"]
    };
  },

  mounted() {
    this.title = this.task.title;
    this.message = this.task.message;
    this.expDate = new Date(this.task.expDate).toISOString().substr(0, 10);
    this.desk = this.desk_id;
    this.isDone = this.task.isDone;

    if (this.$store.getters["user/isLoggedIn"]) {
      console.log("user is logged in");
    } else {
      console.log("user is not logged in");
    }
  },
  methods: {
    async editTask() {
      let task = {
        _id: this.task._id,
        title: this.title,
        message: this.message,
        isDone: this.isDone,
        desk: this.desk,
        expDate: this.expDate
      };

      await this.$store.dispatch("task/updateTask", task);
      this.$emit("closeModal", true);
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
