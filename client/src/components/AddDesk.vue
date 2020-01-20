<template>
  <v-card>
    <v-card-title primary-title>
      Add Desk
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="form">
        <v-container>
          <v-text-field
            label="Title"
            v-model="title"
            clearable
            :rules="titleRules"
            required
            lazy-validation
          />
        </v-container>
      </v-form>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn color="secondary" @click="$refs.form.reset()">Clear</v-btn>
      <v-btn color="secondary" @click="closeModal">Cancel</v-btn>
      <v-spacer />
      <v-btn color="success" :disabled="!form" @click="submitForm"
        >Submit</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AddDesk",
  data() {
    return {
      form: false,
      title: "",
      titleRules: [v => !!v || "Title is required"]
    };
  },
  methods: {
    closeModal() {
      this.$refs.form.reset();
      this.$emit("closeModal");
    },
    submitForm() {
      this.$store
        .dispatch("desk/createDesk", this.title)
        .then(() => this.closeModal());
    }
  }
};
</script>

<style scoped></style>
