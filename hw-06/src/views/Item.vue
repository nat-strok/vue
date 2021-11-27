<template>
  <div>
    <h1>Item page</h1>

    <p><strong> {{ this.$route.params.data.text1 }} </strong></p>
    <p> {{ this.$route.params.data.text2 }} </p>

    <router-link :to="{name: 'List'}"> Return to List </router-link>

  </div>
</template>