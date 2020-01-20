<template>
  <v-card>
    <v-card-title primary-title>User Profile</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-text-field
            name="email"
            label="Email"
            v-model="email"
            readonly
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            name="firstName"
            label="First Name"
            v-model="firstName"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            name="lastName"
            label="Last Name"
            v-model="lastName"
          ></v-text-field>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click.prevent="editProfile">Submit</v-btn>
      <v-btn color="secondary" @click.prevent="$emit('closeModal')"
        >Cancel</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      oldPassword: "",
      password: "",
      confirmation: ""
    };
  },
  mounted() {
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.email = this.user.email;
  },
  methods: {
    editProfile() {
      this.$store.dispatch("user/updateUser", {
        _id: this.user._id,
        firstName: this.firstName,
        lastName: this.lastName
      });
      this.$emit("closeModal");
    }
  },
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    }
  }
};
</script>

<style></style>
