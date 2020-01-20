<template>
  <v-card>
    <v-card-title primary-title>Add Task</v-card-title>
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
            <v-col cols="12" sm="6">
              <v-select
                :items="deskList"
                v-model="desk"
                label="Select Desk"
                item-text="title"
                item-value="_id"
                return-object
                clearable
                :rules="deskRules"
                required
              />
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
      <v-btn color="secondary" @click="$refs.form.reset()">Clear</v-btn>
      <v-btn color="secondary" @click="closeModal">Cancel</v-btn>
      <v-spacer />
      <v-btn color="success" :disabled="!form" @click="addTask">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      form: false,
      menu: false,
      title: "",
      message: "",
      expDate: "",
      desk: {},
      titleRules: [v => !!v || "Title is required"],
      deskRules: [v => !!v || "Desk is required yet"]
    };
  },
  methods: {
    addTask() {
      let task = {
        title: this.title,
        message: this.message,
        isDone: false,
        desk: this.desk._id
      };

      if (this.expDate) {
        task.expDate = this.expDate;
      }
      this.$store
        .dispatch("task/createTask", task)
        .then(() => this.closeModal());
    },
    closeModal() {
      this.$refs.form.reset();
      this.$emit("closeModal");
    }
  },
  computed: {
    deskList() {
      return this.$store.getters["desk/getList"].map(el => ({
        _id: el._id,
        title: el.title,
        local: !!el.local
      }));
    }
  }
};
</script>

<style></style>
