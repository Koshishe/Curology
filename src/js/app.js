import documentReady from './utils/documentReady';
import documentLoaded from './utils/documentLoaded';
import lazyload from './modules/lazyload';

documentReady(() => {
  lazyload.init();
});

documentLoaded(() => {

});
