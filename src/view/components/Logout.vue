<template>
  <div class="logout">
    <Button
      v-if="!plain"
      type="dashed"
      @click="openLogoutConfirmModal"
    >
      Sign out
    </Button>

    <span
      @click="openLogoutConfirmModal"
      v-else
    >
      Sign out
    </span>

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
    name: 'Logout',

    props: {
      plain: {
        type: Boolean,
        default: false
      }
    },

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
    text-align: center;
    .ivu-btn-dashed {
      color: #fff;
      &:hover {
        color: #fff;
      }
    }
  }
</style>

