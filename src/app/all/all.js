/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/all`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngBoilerplate.all', [
  'ui.router',
  'prosAndConsService'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'all', {
    url: '/all',
    views: {
      main: {
        controller: 'AllCtrl',
        templateUrl: 'all/all.tpl.html'
      }
    },
    data: { pageTitle: 'All' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller('AllCtrl', function AllController($scope, $state, $mdSidenav, prosAndConsService) {
  $scope.lists = prosAndConsService.all();

  $scope.toggleLeftnav = function () {
    $mdSidenav('leftnav').toggle();
  };

  $scope.goToList = function (listId) {
    $state.go('edit', {id: listId});
  };

  $scope.deleteList = function (listId, e) {
    e.stopPropagation();
    if (prosAndConsService.remove(listId)) {
      alert('Unable to delete');
    }
    else {
      $scope.lists = prosAndConsService.all();
    }
  };
})

;

