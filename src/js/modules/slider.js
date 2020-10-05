import Swiper, { Navigation } from 'swiper';

Swiper.use([Navigation]);

export default {
  init() {
    this.sliderInit();
  },

  sliderInit() {
    const swiperSlider = new Swiper('.js-slider', {
      navigation: {
        nextEl: '.s-hero__best-slider-next',
        prevEl: '.s-hero__best-slider-prev',
      },
      slidesPerView: 3,
      spaceBetween: 21,
      observer: true,
      observeParents: true,
      breakpoints: {
        1279: {
          spaceBetween: 41,
        },
      },
    });

    console.log(swiperSlider.params.navigation.nextEl);
  },
};
