<template>
  <div class="footer fadeInUp">
    <div class="footer-wrapper">
      <ul class="footer-left-links">
        <li>© 2018 ULIVZ</li>
        <li
          v-for="(item, index) in leftLinks"
          :key="index"
        >
          <a
            target="_blank"
            :href="item.link"
          >{{ item.text }}</a>
        </li>
      </ul>

      <div class="footer-logo">
        <img src="../../../static/assets/images/logo-ecg.png" alt="">
      </div>

      <ul class="footer-right-links">
        <li
          v-for="(item, index) in rightLinks"
          :key="index"
        >
          <a
            target="_blank"
            :href="item.link"
          >{{ item.text }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',

    data() {
      return {
        leftLinks: [
          { text: 'JIRA', link: 'https://www.atlassian.com/software/jira' },
          { text: 'Github', link: 'https://github.com/ulivz/jira' }
        ],
        rightLinks: [
          { text: 'Github', link: 'https://github.com/ulivz' }
        ]
      }
    },

    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .footer {
    @extend %stripe-wrapper;
    .footer-wrapper {
      @extend %normal-full-expand;
      margin-top: 40px;
      border-top: 1px solid #eaecef;;
      height: 80px;
      display: flex;
    }

    ul.footer-left-links, ul.footer-right-links {
      line-height: 80px;
      flex: 1;
      list-style: none;
      li {
        display: inline-block;
      }
    }

    ul.footer-left-links {
      text-align: left;
      li {
        margin-right: 20px;
      }
    }

    ul.footer-right-links {
      text-align: right;
      li {
        margin-left: 20px;
      }
    }

    .footer-logo {
      flex: 0 0 100px;
      display: flex;
      img {
        margin-top: 25px;
        height: 30px;
        width: 55px;
      }
    }
  }
</style>
