<template>
  <div
    class="sidebar"
    :class="{
      'open': show
    }"
  >
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'Sidebar',

    props: {
      extraClasses: String
    },

    data() {
      return { show: false }
    },

    methods: {
      setDisplayStatus(show) {
        this.show = show
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sidebar {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    width: 260px;
    background: #fff;
    padding-top: .5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0, 1);
    transform: translate3d(-105%, 0, 0);
    backface-visibility: hidden;
    &.open {
      transform: translate3d(0, 0, 0);
    }
    @include scope-breakpoint($desktop) {
      display: none;
    }
  }
</style>
