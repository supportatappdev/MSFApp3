/**
 * CustCtrl - controller
 */
function CustCtrl($scope,Cache,$location,AlertService,$http,BSServiceUtil) {
        $("body").removeClass("mini-navbar");
        var spRetailJPResult = function(result) {
            $scope.spRetailJPList = result;
        }
        wc = "spid = 11";//sp.salesperson
        //wcParams = [parseInt($scope.sp.salesperson)];
        BSServiceUtil.queryResultWithCallback("SFSPRetailJPViewRef", "_NOCACHE_", wc, undefined, undefined, spRetailJPResult);
}
angular
    .module('mymobile3')
    .controller('CustCtrl', ['$scope','Cache','$location','AlertService','$http','BSServiceUtil',CustCtrl]);

angular
    .module('mymobile3')
    .controller('AddCustCtrl', function MainCtrl($scope,Cache,$location,AlertService,$http) {
        $("body").removeClass("mini-navbar");
    });    
    