<template>
  <transition
    name="dropdown"
    @enter="setHeight"
    @after-enter="unsetHeight"
    @before-leave="setHeight"
  >
    <slot/>
  </transition>
</template>

<script>
  export default {
    name: 'DropdownTransition',

    methods: {
      setHeight (items) {
        console.log(items.scrollHeight)
        // explicitly set height so that it can be transitioned
        items.style.height = items.scrollHeight + 'px'
      },

      unsetHeight(items) {
        items.style.height = ''
      }
    }
  }
</script>

<style lang="scss">
  .dropdown-enter, .dropdown-leave-to {
    height: 0 !important;
  }

</style>
