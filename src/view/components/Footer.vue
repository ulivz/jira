<template>
  <div class="footer fadeInUp">
    <div class="footer-wrapper">
      <ul class="footer-links-part-1">
        <li>© 2017 <span title="0.43384s from github-corp-ebay-com-primary">
          BOLT Great Wall ·
          <a href="https://github.corp.ebay.com/haolchen" target="_blank">@haolchen</a> ·
           <a href="https://github.com/ulivz" target="_blank">@ULIVZ</a>
        </span></li>
        <li><a href="https://jira.corp.ebay.com/secure/RapidBoard.jspa?rapidView=2128&view=planning" target="_blank">JIRA</a>
        </li>
        <li><a href="http://ci.optimus.vip.ebay.com/" target="_blank">Jenkins</a></li>
        <li><a href="https://github.corp.ebay.com/haolchen/bolt-jira-report/issues" target="_blank">Report Issue</a></li>
        <!--<li><a href="https://github.corp.ebay.com/ecg-global/bolt-2dot0-frontend">Github 2.0</a></li>-->
        <!--<li><a href="https://github.corp.ebay.com/ecg-global/bolt-platform">Github 1.0</a></li>-->
      </ul>
      <div class="footer-logo">
        <img src="../../../static/assets/images/logo-ecg.png" alt="">
      </div>
      <ul class="footer-links-part-2">
        <li><a href="https://www.vivanuncios.com.mx" target="_blank">Vivanuncios</a></li>
        <li><a href="https://www.gumtree.co.za" target="_blank">Gumtree ZA</a></li>
        <!--<li><a href="www.gumtree.ie">Gumtree IE</a></li>-->
        <!--<li><a href="www.gumtree.pl">Gumtree PL</a></li>-->
        <!--<li><a href="www.gumtree.sg">Gumtree SG</a></li>-->
        <!--<li><a href="www.alamaula.com">alaMaula AR</a></li>-->
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {
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
    ul.footer-links-part-1, ul.footer-links-part-2 {
      line-height: 80px;
      flex: 1;
      list-style: none;
      li {
        display: inline-block;
      }
    }
    ul.footer-links-part-1 {
      text-align: left;
      li {
        margin-right: 20px;
      }
    }
    ul.footer-links-part-2 {
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
