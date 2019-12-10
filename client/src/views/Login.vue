<template>
  <div class="container">
    <div>
      <LoginForm :isSigningIn="isSigningIn" />
      <input
        type="checkbox"
        name="hasAccount"
        id="hasAccount"
        v-model="isSigningIn"
        @change="!isSigningIn"
      />
      <label for="hasAccount">Уже есть аккаунт</label>
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm";
export default {
  name: "Login",
  components: {
    LoginForm
  },
  data() {
    return {
      isSigningIn: false
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
