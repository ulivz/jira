<template>
  <!-- Please make sure parent container has width and height -->
  <div class='gradient-wrapper'>
    <span class='bg-orange bg-gradient'></span>
    <span class='bg-purple bg-gradient'></span>
    <span class='bg-blue bg-gradient'></span>
    <div id='stars'></div>
  </div>
</template>

<script>
  export default {
    mounted() {
      setupGradientAnimation()
      createStars()
    }
  }

  function setupGradientAnimation() {
    let active = Math.round(Math.random() * 2)
    let colors = document.querySelectorAll('.bg-gradient')
    let pause = 5000
    let count = colors.length
    let i = 0

    colors[active].classList.add('is-active')
    colors[active].classList.add('initial')
    setTimeout(transition, pause)

    function transition() {
      colors[i].classList.remove('is-active')
      colors[i].classList.remove('initial')
      if (++i >= count) {
        i = 0
      }
      colors[i].classList.add('is-active')
      setTimeout(transition, pause)
    }
  }

  function createStars() {
    let stars = document.getElementById('stars')
    let star = document.getElementsByClassName('star')

    // Random meteor
    for (let j = 0; j < 30; j++) {
      let newStar = document.createElement('div')
      newStar.className = 'star'
      newStar.style.top = randomDistance(30, -30) + 'px'
      newStar.style.left = randomDistance(150, 20) + 'px'
      stars.appendChild(newStar)
    }

    function randomDistance(max, min) {
      let distance = Math.floor(Math.random() * (max - min + 1) * 10 + min)
      return distance
    }

    // Set animation delay for meteor
    for (let i = 0, len = star.length; i < len; i++) {
      if (i % 6 === 0) {
        star[i].style.animationDelay = '0s'
      } else {
        star[i].style.animationDelay = i * 0.8 + 's'
      }
    }
  }
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss'>
  .gradient-wrapper {
    @extend %normal-full-expand;
    opacity: 0.9;
    overflow: hidden;
    background: linear-gradient(135deg, #5073B8 0%, #13a793 36%, #07B39B 81%, #6DBA82 100%);
    z-index: 0;
    .logo-greatwall {
      @extend %absolute-center-better;
      opacity: 0.5;
    }
    .bg-orange,
    .bg-purple,
    .bg-blue {
      @extend %full-expand;
      width: 100%;
      height: 100%;
      display: block;
      opacity: 0;
      transition: opacity 4s ease;
      z-index: -2;
      &.is-active {
        opacity: 1
      }
    }
    .bg-orange {
      background: linear-gradient(135deg, #F37055 0%, #EF4E7B 52%, #C55B95 77%, #A166AB 100%)
    }
    .bg-purple {
      background: linear-gradient(135deg, #A166AB 0%, #5073B8 100%)
    }
    .bg-blue {
      background: linear-gradient(135deg, #5073B8 0%, #13a793 36%, #07B39B 81%, #6DBA82 100%)
    }

    .stars {

    }
    .star {
      display: block;
      width: 1px;
      background: transparent;
      position: relative;
      opacity: 0;
      /*过渡动画*/
      animation: star-fall 3s linear infinite;
      -webkit-animation: star-fall 3s linear infinite;
      -moz-animation: star-fall 3s linear infinite;
    }

    .star:after {
      content: '';
      display: block;
      border: 0px solid #fff;
      border-width: 0px 90px 2px 90px;
      border-color: transparent transparent transparent rgba(255, 255, 255, .5);
      box-shadow: 0 0 1px 0 rgba(255, 255, 255, .1);
      /*变形*/
      transform: rotate(-45deg) translate3d(1px, 3px, 0);
      -webkit-transform: rotate(-45deg) translate3d(1px, 3px, 0);
      -moz-transform: rotate(-45deg) translate3d(1px, 3px, 0);
      transform-origin: 0% 100%;
      -webkit-transform-origin: 0% 100%;
      -moz-transform-origin: 0% 100%;
    }

    @keyframes star-fall {
      0% {
        opacity: 0;
        transform: scale(0.5) translate3d(0, 0, 0);
        -webkit-transform: scale(0.5) translate3d(0, 0, 0);
        -moz-transform: scale(0.5) translate3d(0, 0, 0);
      }
      50% {
        opacity: 1;
        transform: translate3d(-200px, 200px, 0);
        -webkit-transform: translate3d(-200px, 200px, 0);
        -moz-transform: translate3d(-200px, 200px, 0);
      }
      100% {
        opacity: 0;
        transform: scale(1.2) translate3d(-300px, 300px, 0);
        -webkit-transform: scale(1.2) translate3d(-300px, 300px, 0);
        -moz-transform: scale(1.2) translate3d(-300px, 300px, 0);
      }
    }
  }

</style>
