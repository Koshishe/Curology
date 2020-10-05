import './vendor/polyfills';
import './modules/sitePreloader';
import documentReady from './utils/documentReady';
import documentLoaded from './utils/documentLoaded';
import resize from './modules/resize';
import cssVars from './modules/cssVars';
import lazyload from './modules/lazyload';
import slider from './modules/slider';
import smoothScroll from './modules/smoothScroll';

documentReady(() => {
  resize.init();
  cssVars.init();
  lazyload.init();
  slider.init();
  smoothScroll.init();
});

documentLoaded(() => {

});
