<template>
  <div class="footer fadeInUp">
    <div class="footer-wrapper">
      <ul class="footer-left-links">
        <li>© 2018 ULIVZ</li>
        <li
          v-for="(item, index) in leftLinks"
          :key="index"
          :class="item.id"
        >
          <a
            target="_blank"
            :href="item.link"
          >{{ item.text }}</a>
        </li>
      </ul>

      <ul class="footer-right-links">
        <li
          v-for="(item, index) in rightLinks"
          :key="index"
          :class="item.id"
        >
          <a
            target="_blank"
            :href="item.link"
            @click="handleLinkClick(item.id, $event)"
          >{{ item.text }}</a>
        </li>
        <Logout plain/>
      </ul>
    </div>
  </div>
</template>

<script>
  import Logout from './Logout.vue'

  export default {
    name: 'Header',

    components: { Logout },

    data() {
      return {
        leftLinks: [
          { id: 'git', text: 'Github', link: 'https://github.com/ulivz/jira' }
        ],
        rightLinks: [
          { id: 'jira', text: 'JIRA', link: 'https://www.atlassian.com/software/jira' }
        ]
      }
    },

    methods: {
      handleLinkClick(linkId, event) {
        if (linkId === 'sign-out') {
          event.preventDefault()
          this.logout()
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .footer {
    @extend %stripe-wrapper;
    background-color: rgb(236, 236, 236);
    margin-top: 40px;
    height: 80px;
    @include scope-breakpoint($mobile) {
      margin-top: 20px;
      height: 50px;
    }
    .footer-wrapper {
      @extend %normal-full-expand;
      border-top: 1px solid #eaecef;;
      display: flex;
      align-items: center;
      color: rgb(109, 109, 109);
      font-size: 14px;
      font-weight: 700;
      line-height: 3;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      @include scope-breakpoint($mobile) {
        font-size: 12px;
      }
    }

    ul.footer-left-links, ul.footer-right-links {
      list-style: none;
      li {
        display: inline-block;
      }
    }

    ul.footer-left-links {
      flex: 0 0 250px;
      text-align: left;
      li {
        margin-right: 20px;
      }
    }

    ul.footer-right-links {
      flex: 1;
      text-align: right;
      li {
        margin-left: 20px;
      }
      & > .jira {
        @include scope-breakpoint($mobile) {
          display: none;
        }
      }
      & > .logout {
        text-align: right;
        @include scope-breakpoint($tablet) {
          display: none;
        }
        @include scope-breakpoint($desktop) {
          display: none;
        }
      }
    }
  }
</style>
