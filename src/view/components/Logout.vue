<template>
  <div class="logout">
    <Button
      type="dashed"
      @click="openLogoutConfirmModal"
    >
      log out
    </Button>
    <Modal
      v-model="logoutConfirmModal"
      @on-ok="logout"
      ok-text="OK"
      cancel-text="Cancel"
      @on-cancel="logoutCancel"
    >
      <p>Are you sure you want to log out?</p>
    </Modal>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'Welcome',

    data() {
      return {
        logoutConfirmModal: false
      }
    },

    computed: {
      ...mapState(['username'])
    },

    methods: {
      openLogoutConfirmModal() {
        this.logoutConfirmModal = true
      },

      logoutCancel() {
        this.$Message.info('Cancelled')
      },

      ...mapMutations([
        'logout'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  .logout {
    .ivu-btn-dashed {
      color: #fff;
      &:hover {
        color: #fff;
      }
    }
  }
</style>

