import documentReady from './utils/documentReady';
import documentLoaded from './utils/documentLoaded';
import sitePreloader from './modules/sitePreloader';
import resize from './modules/resize';
import lazyload from './modules/lazyload';

documentReady(() => {
  sitePreloader.init();
  resize.init();
  lazyload.init();
});

documentLoaded(() => {

});
