<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton"
};
</script>

<style scoped>
button {
  text-transform: uppercase;
  font-weight: 700;
  border: none;
  padding: 10px 25px;
  color: #ffffff;
  background-color: #3b3b3b;
}

button:hover,
button:focus {
  background-color: #555555;
}

button:active {
  color: rgba(255, 255, 255, 0.3);
}
</style>
