<template>
  <div class="welcome">Hello, @{{username}}</div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Welcome',

    computed: {
      ...mapState(['username'])
    }
  }
</script>

<style lang="scss" scoped>
  .welcome {

  }
</style>

