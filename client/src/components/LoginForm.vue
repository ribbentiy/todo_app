<template>
  <div class="login-form">
    <form @submit.prevent="validateForm" novalidate>
      <div class="errors" v-if="!(errors.length === 0)">
        <b>Following errors have been occured:</b>
        <ul>
          <li v-for="(err, index) in errors" :key="index">{{ err }}</li>
        </ul>
      </div>
      <fieldset>
        <label for="login-email">Email: </label><br />
        <input
          type="email"
          id="login-email"
          v-model="email"
          placeholder="JonDow@example.com"
          title="Please fill the email field"
        />
      </fieldset>
      <fieldset>
        <label for="login-password">Password:</label><br />
        <input
          type="password"
          id="login-password"
          v-model="password"
          placeholder="*****"
          title="Please fill the password field"
        />
        <div v-if="!isSigningIn">
          <label for="login-confirm">Confirm password:</label><br />
          <input
            type="password"
            v-model="confirmPassword"
            id="login-confirm"
            title="Please confirm password"
          />
        </div>
      </fieldset>
      <BaseButton @click.prevent="submit" @keyup.enter="submit">
        {{ isSigningIn ? "LogIn" : "SignUp" }}
      </BaseButton>
    </form>
  </div>
</template>

<script>
import isEmail from "validator/es/lib/isEmail";
import equals from "validator/es/lib/equals";
import BaseButton from "../components/BaseButton";

export default {
  name: "LoginForm",
  components: {
    BaseButton
  },
  props: {
    isSigningIn: Boolean
  },
  data: () => ({
    errors: [],
    email: "",
    password: "",
    confirmPassword: ""
  }),
  methods: {
    validateForm() {
      this.errors = [];
      if (!this.email) {
        this.errors.push("No email provided");
      }
      if (!isEmail(this.email)) {
        this.errors.push("Email should be valid email adress");
      }
      if (!this.password) {
        this.errors.push("No password provided");
      }
      if (!this.isSigningIn && !equals(this.password, this.confirmPassword)) {
        this.errors.push("Password and confirmation must be the same");
      }
      if (this.errors.length === 0) {
        console.log("well done!");
      }
    }
  }
};
</script>

<style scoped>
.login-form input {
  width: 100%;
  margin-bottom: 10px;
}

.errors {
  background-color: rgb(255, 164, 164);
  border: 3px solid rgb(255, 120, 120);
}

fieldset {
  width: 300px;
  border: none;
  padding: 0;
}
</style>
