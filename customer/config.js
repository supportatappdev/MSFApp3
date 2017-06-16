function custconfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

    $stateProvider
        .state('index.addcust', {
            url: "/addcust",
            templateUrl: "customer/add.html",
            data: { pageTitle: 'New Retailer' }
        })
        .state('index.listcust', {
            url: "/listcust",
            templateUrl: "customer/retailers.html",
            data: { pageTitle: 'My Retailers' }
        })
}
angular
    .module('mymobile3')
    .config(custconfig)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
        $rootScope.appName = "mymobile3";
    });