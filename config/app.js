/**
 * mymobile3
 */
(function () {
    angular.module('mymobile3', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'datePicker',
        'cgNotify',
        'ngResource',
        'oitozero.ngSweetAlert' 
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

