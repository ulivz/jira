<template>
  <div class="header fadeInDown">
    <Icon type="android-menu"></Icon>
    <div class="header-left">
      <i class="icon iconfont icon-Jira"></i>
      <a target="_blank"
         href="https://github.corp.ebay.com/haolchen/bolt-jira-report/blob/master/CHANGELOG.md"
         class="version">{{ 'v' + version }}
      </a>
    </div>

    <div class="header-right">
      <TeamSelect/>
      <Welcome/>
      <Logout/>
    </div>
  </div>
</template>

<script>
  import TeamSelect from './TeamSelect.vue'
  import Welcome from './Welcome.vue'
  import Logout from './Logout.vue'

  export default {
    name: 'Header',

    components: { TeamSelect, Welcome, Logout },

    data() {
      return {
        version: process.env.APP_VERSION
      }
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
    }
  }
</style>
