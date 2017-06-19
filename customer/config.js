function custconfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

    $stateProvider
        .state('index.addcust', {
            url: "/addcust",
            templateUrl: "customer/add.html",
            data: { pageTitle: 'Add Retailer' }
        })
        .state('index.listcust', {
            url: "/listcust",
            templateUrl: "customer/retailers.html",
            data: { pageTitle: 'My Retailers' }
        })
        .state('index.listcustjp', {
            url: "/listcustjp",
            templateUrl: "customer/jpretailers.html",
            data: { pageTitle: 'Today Journey' }
        })
        .state('index.newcall', {
            url: "/newcall",
            templateUrl: "customer/newcall.html",
            data: { pageTitle: 'New Order' }
        })
}
angular
    .module('mymobile3')
    .config(custconfig)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
        $rootScope.appName = "mymobile3";
    });