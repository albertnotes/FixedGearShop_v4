<template>
  <div>
    <figure class="hero" :style="containerStyle">
      <div class="hero__overlay">
        <div class="hero__overlay__text">
          <h2 class="mb-3">
            有些事現在不做<br/>
            一輩子也不會做了<br/>
            現在去環島
          </h2>
          <button type="button" class="btn btn-lg btn-danger"
          data-toggle="modal" data-target="#exampleModal">
            馬上領取
          </button>
        </div>
      </div>
    </figure>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal"
    tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title" id="exampleModalLabel">
              God&Famous TEAM
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <figure class="figure">
              <img :src="require('@/assets/images/gift.png')"
              class="figure-img img-fluid rounded" alt="">
              <figcaption class="figure-caption text-right">
                環島注意水份補充，小編關心您。
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FrontHero',
  props: {
    containerStyle: String,
  },
};
</script>

<style lang="scss" scoped>
.hero {
  background-image: url('~@/assets/images/frontHeroCategory.png');
  background-size: cover;
  background-position: top;
  width: 100%;
  margin-bottom: 0;
  position: relative;
  .hero__overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(black, $alpha: .3);
    .hero__overlay__text {
      color: white;
      text-align: center;
    }
  }
}
</style>
