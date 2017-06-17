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
        var spRetailResult = function(result) {
            $scope.spRetailList = result;
        }
        wc = "spid = 11";//sp.salesperson
        //wcParams = [parseInt($scope.sp.salesperson)];
        BSServiceUtil.queryResultWithCallback("SFSPRetailViewRef", "_NOCACHE_", wc, undefined, undefined, spRetailResult);
}
angular
    .module('mymobile3')
    .controller('CustCtrl', ['$scope','Cache','$location','AlertService','$http','BSServiceUtil',CustCtrl]);

angular
    .module('mymobile3')
    .controller('AddCustCtrl', function MainCtrl($scope,Cache,$location,AlertService,$http,BSService) {
        $("body").removeClass("mini-navbar");
        var _operation = 'INSERT';
        $scope.addCustomer = function() {
        $scope.addcspinner = true;
          var inputJSON = {};
                if(_operation !== 'UPDATE') {
                    inputJSON.uid = Cache.loggedInUser.userId;
                } else {
                    inputJSON.CREATION_DATE = Util.convertDBDate(inputJSON.CREATION_DATE);
                    inputJSON.LAST_UPDATE_DATE = Util.convertDBDate(new Date());
                }
                inputJSON = $scope.cust;
                inputJSON.cust_code = 'W00'+$scope.cust.cust_name;
                 var params = {
                'ds': 'FISFCustomerRef',
                'operation': _operation,
                'data': inputJSON
            };
            BSService.save({
                'method': 'update'
            }, params, function(result) {
                if (result.status === "E") {
                    AlertService.showError("Validation Error",result.errorMsg);
                }  else {
                    var _op = "Added";
                    if(_operation == 'UPDATE') {
                        _op = "Updated";
                    }
                    AlertService.showInfo("Added retailer ["+$scope.cust.cust_name+"]  successfully");
                    $scope.gotoCustomers();
                }
                $scope.addcspinner  =false;
            });
        }
        
        $scope.gotoCustomers = function() {
            $location.path("/index/listcust");
        }
    });    
    