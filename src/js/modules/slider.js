import Swiper from 'swiper';

export default {
  init() {
    this.sliderInit();
  },

  sliderInit() {
    const slider = new Swiper('.js-slider', {
      direction: 'vertical',
      loop: false,
      slidesPerView: '3',

      // Navigation arrows
      navigation: {
        nextEl: '.js-slider-next',
        prevEl: '.js-slider-prev',
      },
    });
    slider.update();
  },
};
