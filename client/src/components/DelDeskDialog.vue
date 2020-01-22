<template>
  <v-card>
    <v-card-title primary-title>Delete Desk</v-card-title>
    <v-card-text>
      This action cannot be undone. This will permanently delete the <strong>{{desk.title}}</strong> desk
      <v-form ref="form" v-model="form">
        <v-text-field
          label="Desk name"
          :hint="`To delete Desk please type ${desk.title}`"
          :rules="delRules"
          lazy-validation
          required
          clearable

        />
      </v-form>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn color="secondary" @click="$refs.form.reset()">Clear</v-btn>
      <v-btn color="secondary" @click="closeModal">Cancel</v-btn>
      <v-spacer />
      <v-btn color="error dark darker-4" :disabled="!form" @click="deleteDesk">Delete anyway</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import equals from "validator/es/lib/equals";

  export default {
    name: "DelDeskDialog",
    props: ['desk'],
    data() {
      return {
        form: false,
        delRules:[
          v => !!v || 'Desk title is required',
          v => equals(v || "", this.desk.title) || "Incorrect Desk Title"
        ]
      }
    },
    methods: {
      closeModal() {
        console.log(this.$refs)
        this.$refs.form.reset()
        this.$emit('closeModal')
      },
      deleteDesk() {
        this.$store.dispatch('desk/deleteDesk', this.desk._id)
      }
    }
  }
</script>

<style scoped>

</style>