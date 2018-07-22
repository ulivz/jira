<template>
  <div class="preloader"
       :class="[
        show ? 'loading' : '',
        extraClasses]"
  >
    <div class="loader"></div>
  </div>
</template>

<script>
  export default {
    props: {
      extraClasses: String
    },

    data() {
      return { show: true }
    },

    methods: {
      setDisplayStatus(show) {
        this.show = show
      }
    }
  }
</script>

<style lang="scss" scoped>
  .preloader {
    @extend %full-expand;
    background-color: rgba(0, 0, 0, .5);
    opacity: 0;
    transition: opacity 0.5s;
    z-index: -100;
    &.loading {
      opacity: 1;
      z-index: 100;
    }
  }

  .loader {
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 150px;
    height: 150px;
    margin: -75px 0 0 -75px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #9370DB;
    animation: spin 2s linear infinite;
  }

  .loader:before {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #BA55D3;
    animation: spin 3s linear infinite;
  }

  .loader:after {
    content: "";
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #FF00FF;
    animation: spin 1.5s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
