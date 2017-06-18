/**
 * CustCtrl - controller
 */
function CustCtrl($scope,Cache,$location,AlertService,$http,BSServiceUtil) {
        $("body").removeClass("mini-navbar");
        $scope.retailers = {
             spRetailList:[],
             retailListLoading: false,
             offset: 0,
             limit: 20
        };
        var loadReatils  = function() {
              $scope.retailers.retailListLoading = true;
            var spRetailResult = function(result) {
                $scope.retailers.retailListLoading = false;
                for(var k = 0; k < result.length; k++) {
                    $scope.retailers.spRetailList.push(result[k]);
                }
                if(result.length <  $scope.retailers.limit) {
                    $scope.retailers.loaded = true;
                }
            }
            var wc = "spid = ?";//sp.salesperson
            var wcParams = [ $scope.salesrep.id];
            BSServiceUtil.queryResultWithCallback("SFSPRetailViewRef", "_NOCACHE_", wc, wcParams, undefined, spRetailResult, $scope.retailers.limit,$scope.retailers.offset);
        }
        loadReatils();
        $scope.getNextPage = function() {
            if($scope.retailers.loaded) {
                return;
            }
            $scope.retailers.offset = ($scope.retailers.offset + $scope.retailers.limit);
            loadReatils();
        }
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
    