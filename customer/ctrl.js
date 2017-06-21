/**
 * CustCtrl - controller
 */

angular
    .module('mymobile3')
    .controller('CustCtrl', function CustCtrl($scope,Cache,$location,AlertService,$http,BSServiceUtil) {
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
});
angular
    .module('mymobile3')
    .controller('JPRetailsCtrl', function CustCtrl($scope,Cache,$location,AlertService,$http,BSServiceUtil) {
       $scope._currDate = new Date();
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
            BSServiceUtil.queryResultWithCallback("SFSPRetailJPViewRef", "_NOCACHE_", wc, wcParams, undefined, spRetailResult, $scope.retailers.limit,$scope.retailers.offset);
        }
        loadReatils();
        $scope.getNextPage = function() {
            if($scope.retailers.loaded) {
                return;
            }
            $scope.retailers.offset = ($scope.retailers.offset + $scope.retailers.limit);
            loadReatils();
        }
        $scope.startCall = function() {
            var callback = function() {
                $location.path("/index/newcall");
            }
            AlertService.showConfirm("Warning","Your day haven't started yet. Do you wish to start yoru day?",callback);
        }
});
angular
    .module('mymobile3')
    .controller('NewCallCtrl', function CustCtrl($filter,$scope,Cache,$location,AlertService,$http,BSServiceUtil,$location) {
       $scope._currDate = new Date();
       var loadProducts = function() {
            var products = function(result) {
                    $scope.products = result;
            }
            BSServiceUtil.queryResultWithCallback("SFProductRef", "_NOCACHE_", undefined, undefined, undefined, products);
       }
       loadProducts();
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
            BSServiceUtil.queryResultWithCallback("SFSPRetailJPViewRef", "_NOCACHE_", wc, wcParams, undefined, spRetailResult, $scope.retailers.limit,$scope.retailers.offset);
        }
        loadReatils();
         $scope.setProdDetails = function(selproduct,po) {
                po.price = selproduct.ctnr_price;
                po.prodname = selproduct.prd_name;
            }
            
        $scope.setTotal = function(po) {
                po.total = $filter('number')(po.price*po.quantity,2);
            }    
     
        $scope.getNextPage = function() {
            if($scope.retailers.loaded) {
                return;
            }
            $scope.retailers.offset = ($scope.retailers.offset + $scope.retailers.limit);
            loadReatils();
        }
        $scope.order = [];
        $scope.addNew = function($event){
            $event.preventDefault();
            $scope.order.push( {selected:false,prodname:'',quantity:'',price:'',grams:'',no_of_packs:'',loadability:''});
        };
        $scope.remove = function(){
                var newDataList=[];
                $scope.selectedAll = false;
                angular.forEach($scope.order, function(selected){
                    if(!selected.selected){
                        newDataList.push(selected);
                    }
                }); 
                $scope.order = newDataList;
            };
        $scope.selectedAll  = false;
        $scope.checkAll = function () {
            if (!$scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
            angular.forEach($scope.order, function(mps) {
                mps.selected = $scope.selectedAll;
            });
        };   
        
});

angular
    .module('mymobile3')
    .controller('AddCustCtrl', function AddCustCtrl($scope,Cache,$location,AlertService,$http,BSService) {
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
                }  else {a
                    var _op = "Added";
                    if(_operation == 'UPDATE') {
                        _op = "Updated";
                    }
                    AlertService.showInfo("Warning","Added retailer ["+$scope.cust.cust_name+"]  successfully");
                    $scope.gotoCustomers();
                }
                $scope.addcspinner  =false;
            });
        }
        
        $scope.gotoCustomers = function() {
            $location.path("/index/listcust");
        }
    });    
    