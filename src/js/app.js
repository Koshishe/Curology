import documentReady from './utils/documentReady';
import documentLoaded from './utils/documentLoaded';
import sitePreloader from './modules/sitePreloader';
import lazyload from './modules/lazyload';

documentReady(() => {
  sitePreloader.init();
  lazyload.init();
});

documentLoaded(() => {

});
