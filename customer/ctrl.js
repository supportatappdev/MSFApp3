/**
 * CustCtrl - controller
 */
//controller('OrderCtrl',function(Cache,$scope,$location,BSServiceUtil,BSService,Util,AlertService,$modal){
 
angular
    .module('mymobile3')
    .controller('CustCtrl', function MainCtrl($scope,Cache,$location,AlertService,$http,BSServiceUtil) {
        $("body").removeClass("mini-navbar");
        var spRetailResult = function(result) {
            $scope.spRetailList = result;
        }
        var wc = "spid = 11";//sp.salesperson
        //var wcParams = [parseInt($scope.sp.salesperson)];
        BSServiceUtil.queryResultWithCallback("SFSPRetailViewRef", "_NOCACHE_", wc, undefined, undefined, spRetailResult);
    });
    
angular
    .module('mymobile3')
    .controller('AddCustCtrl', function MainCtrl($scope,Cache,$location,AlertService,$http) {
        $("body").removeClass("mini-navbar");
    });    
    