<template>
  <div id="landing-spread" >

    <div class="landing-spread-section section1">
      <h1>This space will be used to hightlight projects.</h1>
      <line-break></line-break><br><br>
      <p>At launch, it'll probably be an overview of the organization. </p><br>
      <p>Later, we'll use this space to highlight co-productions and Rooftop Originals.</p>
    </div>
    <div class="landing-spread-section section2">
      <img src="~/assets/landing_spread_assets/default_clown.svg">
    </div>

  </div>
</template>

<script>
import lineBreak from '@/components/misc/line-break.vue';
export default {
  components: {
    lineBreak
  }
}
</script>

<style lang="scss" scoped>
#landing-spread {
  display:  flex;
  flex-flow: row wrap;
  height: 100%;
  color: white;
  
  .landing-spread-section {
    width: 50%;
    height: 100%;
    position: relative;
    text-align: center;
    overflow: hidden;

    .section1 {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    h1 {
      font-weight: normal;
      width: 350px;
      margin: 50px auto 40px auto;
    }
    p {
      width: 350px;
      margin: 10px auto 0px auto;
    }

    svg {
      width: 70%;
    }
    img {
      position: absolute;
      bottom: -3px;
      right: -3px;
    }

  }
}
</style>