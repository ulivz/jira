<template>
  <div class="team-select">
    <Select v-model="currentTeamId">
      <Option
        v-for="team in teams"
        :value="team.id"
        :key="team.id"
      >{{ team.name }}
      </Option>
    </Select>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'TeamSelect',

    computed: {
      ...mapState(['teams']),

      ...mapGetters(['currentTeam']),

      currentTeamId: {
        get() {
          return this.$store.state.currentTeamId
        },
        set(value) {
          // delay update
          const nextTeamName = this.$store.getters.getTeamNameById(value)
          setTimeout(() => {
            this.$store.commit('changeTeam', value)
          }, 10)
          setTimeout(() => {
            this.$Message.info('You have switched to ' + nextTeamName)
          }, 500)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .team-select {
    text-align: center;
    a {
      color: #fff;
    }
    .ivu-dropdown-menu {
      li {
        text-align: center;
      }
    }
    .ivu-select-placeholder {
      color: #495060 !important;
    }
  }
</style>

