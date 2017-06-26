/**
 * mymobile3
 */
(function () {
    angular.module('mymobile3', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'ngResource',
         'cgNotify',
          'oitozero.ngSweetAlert',
          'infinite-scroll'
        //   ,
        //   'ngMap'
    ])
})();


function getBaseURL() {
	   return location.protocol + "//" + location.hostname + 
	      (location.port && ":" + location.port) ;
}; 
function getAppName(p) {
   return "/";
}
var _appUrl = "http://ec2-54-80-147-67.compute-1.amazonaws.com:8180";//getBaseURL()+getAppName(window.location.pathname);

