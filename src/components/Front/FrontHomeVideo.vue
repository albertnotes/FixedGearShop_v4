<template>
  <section class="videoContainer" :style="containerStyle">
    <video class="videoContainer__video" v-if="desktopShow"
    type="video/mp4"
    playinline autoplay muted loop
    :src="require('@/assets/video/headerVideo.mp4')"/>
    <div class="videoContainer__text">
      <h2 class="mb-3">
        即日起輸入 FixedGearLove<br/>
        享受最高 20% 折扣
      </h2>
      <router-link to="/category" class="btn btn-lg btn-danger px-5">前往購買</router-link>
    </div>
  </section>
</template>

<script>

export default {
  name: 'FrontHomeVideo',
  props: {
    containerStyle: String,
  },
  data(
  ) {
    return {
      desktopShow: window.screen.width >= 768,
    };
  },
};
</script>

<style lang="scss" scoped>
.videoContainer {
  position: relative;
  overflow: hidden;
  background-color: black;
  @media (max-width: 767px) {
    background-image: url('~@/assets/images/frontHeroHome.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .videoContainer__video {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom:0;
  }
  .videoContainer__text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
    @media (max-width: 767px) {
      h2 {
        font-size: 1.75rem;
      }
    }
  }
}
</style>
