<template>
  <v-card>
    <v-card-title primary-title>Edit Task</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="form">
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
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Message"
                v-model="message"
                rows="1"
                auto-grow
                clearable
              />
            </v-col>
            <v-col cols="12">
              <v-checkbox
                :label="isDone ? 'Done' : 'Not done'"
                v-model="isDone"
              />
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
              >
              </v-select>
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
                  />
                </template>
                <v-date-picker v-model="expDate" no-title scrollable>
                  <v-spacer />
                  <v-btn text color="primary" @click="menu = false"
                    >Cancel</v-btn
                  >
                  <v-btn text color="primary" @click="$refs.menu.save(expDate)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn color="secondary" @click="$emit('closeModal')">Cancel</v-btn>
      <v-spacer />
      <v-btn color="success" :disabled="!form" @click="editTask">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["task_id", "desk_id", "open"],

  data() {
    return {
      form: false,
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
    const { title, message, isDone, expDate } = this.$store.getters[
      "task/getTask"
    ](this.task_id);
    this.title = title;
    this.message = message;
    this.expDate = new Date(expDate).toISOString().substr(0, 10);
    this.desk = this.desk_id;
    this.isDone = isDone;
  },
  watch: {
    open() {
      if (this.open) {
        const { title, message, isDone, expDate } = this.$store.getters[
          "task/getTask"
        ](this.task_id);

        this.title = title;
        this.message = message;
        this.expDate = new Date(expDate).toISOString().substr(0, 10);
        this.desk = this.desk_id;
        this.isDone = isDone;
      }
    }
  },
  methods: {
    async editTask() {
      let task = {
        _id: this.task_id,
        title: this.title,
        message: this.message,
        isDone: this.isDone,
        desk: this.desk,
        expDate: this.expDate
      };
      if (this.desk_id !== task.desk) {
        task.oldDesk = this.desk_id;
      }
      await this.$store.dispatch("task/updateTask", task);

      this.$emit("closeModal");
    }
  },
  computed: {
    deskList() {
      return this.$store.getters["desk/getList"];
    }
  }
};
</script>

<style></style>
