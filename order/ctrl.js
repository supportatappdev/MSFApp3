/**
 * OrderCtrl - controller
 */
function OrderCtrl($scope,Cache,$location,AlertService,$http,BSServiceUtil,$modal) {
        $("body").removeClass("mini-navbar");
     //   $scope.orderListLoading = true;
        $scope.orders = {
             orderList:[],
             orderListLoading: false,
             offset: 0,
             limit: 20
        };
     var loadOrders = function() {
         $scope.orders.orderListLoading = true;
      var orderResult = function(result) {
        $scope.orders.orderListLoading = false;
            for(var k = 0; k < result.length; k++) {
                    $scope.orders.orderList.push(result[k]);
            }
            if(result.length <  $scope.orders.limit) {
                    $scope.orders.loaded = true;
            }
    }
      BSServiceUtil.queryResultWithCallback("SFOrdersViewRef", "_NOCACHE_", undefined, undefined, undefined, orderResult,$scope.orders.limit,$scope.orders.offset);
     }
     loadOrders();
     $scope.getNextPage = function() {
            if($scope.orders.loaded) {
                return;
            }
            $scope.orders.offset = ($scope.orders.offset + $scope.orders.limit);
            loadOrders();
        }

    $scope.openLineItems = function(row) {
        $scope.inv = row;
        var modalInstance = $modal.open({
            templateUrl: 'order/orderdet.html',
            size: "sm",
            scope: $scope,
            controller: lineItemCntrl
        });
    }
}
function lineItemCntrl($scope,BSServiceUtil,$modalInstance) {
    
    var invoiceItem = function(c,params) {
       $scope.loadDetData  = true;
        var invoiceListItemResult = function(result) {
            $scope.loadDetData  = false;
            $scope.invoiceItems = result;
        }//FIGetPIDetailsRef
        BSServiceUtil.queryResultWithCallback("SFOrderDetViewRef", "_NOCACHE_", c, params, undefined, invoiceListItemResult);
        //$location.path("/index/feedbacklist");
    };
    var wc = "order_no = ?";
    var wcParams = [$scope.inv.order_no];
    invoiceItem(wc,wcParams);
      $scope.inv1 = $scope.inv;
//    $scope.docType = $scope.inv.cust_name;//ACCOUNT_CODE;//$scope.dtype;//"Invoice";
 //   $scope.docNo = $scope.inv.order_no;//$scope.dno;//1234;
   // $scope.docDt = $scope.inv.cust_code;//SO_DATE;
    
    $scope.close = function(){
        $modalInstance.close();
    }
}

angular
    .module('mymobile3')
    .controller('OrderCtrl', ['$scope','Cache','$location','AlertService','$http','BSServiceUtil','$modal',OrderCtrl])
    .controller('lineItemCntrl',['$scope','BSServiceUtil', lineItemCntrl]);
