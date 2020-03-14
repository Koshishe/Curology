import './vendor/polyfills';
import documentReady from './utils/documentReady';
import documentLoaded from './utils/documentLoaded';
import sitePreloader from './modules/sitePreloader';
import resize from './modules/resize';
import cssVars from './modules/cssVars';
import lazyload from './modules/lazyload';

documentReady(() => {
  sitePreloader.init();
  resize.init();
  cssVars.init();
  lazyload.init();
});

documentLoaded(() => {

});
