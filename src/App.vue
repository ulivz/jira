<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>

  ul li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  ::selection {
    background: rgba(161, 102, 171, 0.8)
  }

  ::-moz-selection {
    background: rgba(161, 102, 171, 0.8)
  }


</style>
