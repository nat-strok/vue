<template>
    <button class="btn logout" @click="logout">Выход</button>
</template>

<script>
import {A_LOGIN} from "@/types/actions";

export default {
  name: 'LogOut',
  methods: {
    logout() {
      this.$store.dispatch(A_LOGIN, {id: ''});
      this.$router.push({name: "Home"});
    }
  }
}
</script>

<style scoped>
.logout {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>