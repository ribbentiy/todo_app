<template>
  <v-card>
    <v-card-title>Login/Signin Form</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="form">
        <v-text-field
          label="Email address"
          v-model="email"
          :rules="[rules.email, rules.required]"
          type="email"
          lazy-validation
        />
        <v-text-field
          label="Password"
          v-model="password"
          counter="4"
          :rules="[rules.required, rules.length(4)]"
          type="password"
          lazy-validation
        />
        <v-text-field
          v-if="signIn"
          label="Confirm Password"
          type="password"
          :rules="[rules.required, rules.isEqual(password)]"
        />
        <v-switch v-model="signIn" inset label="SignIn?" />
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
import isEmail from "validator/es/lib/isEmail";
import equals from "validator/es/lib/equals";
// TODO Change counter and password length validation to 6
export default {
  name: "LoginForm",

  data: () => ({
    email: "",
    password: "",
    confirmPassword: "",
    form: false,
    signIn: false,
    rules: {
      email: v => isEmail(v || "") || "Please enter a valid email",
      required: v => !!v || "This field is required",
      length: len => v =>
        (v || "").length >= len || `Invalid character length, required ${len}`,
      isEqual: str => v =>
        equals(v || "", str) || "Password and confirmation should be the same"
    }
  }),
  methods: {
    closeModal() {
      this.$refs.form.reset();
      this.$emit("closeModal");
    },
    submitForm() {
      try {
        if (this.signIn) {
          this.$store.dispatch("user/registerUser", {
            email: this.email,
            password: this.password
          });
        } else {
          this.$store.dispatch("user/authUser", {
            email: this.email,
            password: this.password
          });
        }
        this.$refs.form.reset();
        this.$emit("closeModal");
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped></style>
