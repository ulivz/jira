<template>
  <div
    class="sidebar"
    :class="{
      'open': showSideBar
    }"
  >
    <div class="sidebar-header">
      <Icon
        @click="setShowSideBar(!showSideBar)"
        type="ios-close-empty"/>
    </div>
    <slot/>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'Sidebar',

    props: {
      extraClasses: String
    },

    computed: mapState(['showSideBar']),

    methods: mapMutations(['setShowSideBar'])
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
    padding: 10px 20px 20px 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0, 1);
    transform: translate3d(-105%, 0, 0);
    backface-visibility: hidden;
    &.open {
      transform: translate3d(0, 0, 0);
    }
    .sidebar-header {
      text-align: right;
      .ivu-icon-ios-close-empty {
        font-size: 50px;
        color: #aaa;
      }
    }
    @include scope-breakpoint($tablet) {
      display: none;
    }
    @include scope-breakpoint($desktop) {
      display: none;
    }
  }
</style>
