angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.about',
  'ngBoilerplate.new',
  'ngBoilerplate.all',
  'ngBoilerplate.edit',
  'ui.router',
  'ngMaterial',
  'LocalStorageModule'
])

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('orange');
})

.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('prosandcons');
})

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/new' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $mdSidenav, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate';
    }
  });

  $scope.mdSidenav = $mdSidenav;
})

;

