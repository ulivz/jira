<template>
  <div class="header fadeInDown">

    <div class="header-left">
      <i class="icon iconfont icon-Jira"></i>
      <a target="_blank"
         href="https://github.corp.ebay.com/haolchen/bolt-jira-report/blob/master/CHANGELOG.md"
         class="version">{{ 'v' + version }}
      </a>
    </div>

    <ul class="header-right">
      <li class="team-switch">
        <Select
          @on-change="switchTeam"
          :placeholder="currentTeam.name"
        >
          <Option
            v-for="team in teams"
            :value="team.id"
            :key="team.id"
          >
            {{ team.name }}
          </Option>
        </Select>
      </li>

      <li class="welcome">Hello, @{{username}}</li>

      <li class="logout">
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
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'Header',

    data() {
      return {
        logoutConfirmModal: false,
        version: process.env.APP_VERSION
      }
    },

    computed: {
      currentTeam() {
        return this.teams.find(team => team.id === this.currentTeamId)
      },

      ...mapState([
        'teams',
        'currentTeamId',
        'username'
      ])
    },

    methods: {
      openLogoutConfirmModal() {
        this.logoutConfirmModal = true
      },

      logoutCancel() {
        this.$Message.info('Cancelled')
      },

      switchTeam(id) {
        this.$Message.info('You have switched to ' + this.currentTeam.name)
        this.changeTeam(id)
      },

      ...mapMutations([
        'logout',
        'changeTeam'
      ])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .header {
    @extend %responsive-wrapper;
    position: absolute;
    width: 100%;
    top: 0;
    height: 80px;
    display: flex;

    .header-left {
      flex: 1;
      .icon-Jira {
        font-size: 50px;
        color: #fff;
        transition: all 0.5s;
        &:hover {
          background-image: linear-gradient(90deg,
            #1098AD 0%,
            #07B39B 60%,
            #6DBA82 100%
          );
          background-size: cover;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .version {
        position: relative;
        top: 5px;
        color: white;
      }
    }

    .header-right {
      color: #fff;
      flex: 1;
      text-align: right;
      & > li {
        display: inline-block;
        margin-left: 20px;
      }
      .team-switch {
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
      .welcome {
      }
      .logout {
        margin-top: 25px;
        .ivu-btn-dashed {
          color: #fff;
          &:hover {
            color: #fff;
          }
        }
      }
    }

  }
</style>
