function custconfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

    $stateProvider
        .state('index.addcust', {
            url: "/addcust",
            templateUrl: "customer/add.html",
            data: { pageTitle: 'Add Customer' }
        })
        .state('index.listcust', {
            url: "/listcust",
            templateUrl: "retailsers.html",
            data: { pageTitle: 'Customers' }
        })
}
angular
    .module('mymobile3')
    .config(custconfig)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
        $rootScope.appName = "mymobile3";
    });