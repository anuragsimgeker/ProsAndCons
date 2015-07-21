/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/new`, however, could exist several additional folders representing
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
angular.module( 'ngBoilerplate.new', [
  'ui.router',
  'prosAndConsService',
  'onEnter'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'new', {
    url: '/new',
    views: {
      main: {
        controller: 'NewCtrl',
        templateUrl: 'new/new.tpl.html'
      }
    },
    data: { pageTitle: 'New' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller('NewCtrl', function NewController($scope, $mdSidenav, $mdToast, prosAndConsService) {

  $scope.title = null;

  $scope.newPro = null;
  $scope.newCon = null;

  $scope.pros = [];
  $scope.cons = [];

  $scope.prosTotal = 0;
  $scope.consTotal = 0;

  $scope.calculateProsTotal = function () {
    $scope.prosTotal = 0;
    angular.forEach($scope.pros, function (pro) {
      $scope.prosTotal += parseInt(pro.weight, 10);
    });
  };

  $scope.calculateConsTotal = function () {
    $scope.consTotal = 0;
    angular.forEach($scope.cons, function (con) {
      $scope.consTotal += parseInt(con.weight, 10);
    });
  };

  $scope.$watch('pros', function (newValue, oldValue) {
    if (newValue !== oldValue) {
      $scope.calculateProsTotal();
    }
  }, true);

  $scope.$watch('cons', function (newValue, oldValue) {
    if (newValue !== oldValue) {
      $scope.calculateConsTotal();
    }
  }, true);

  $scope.calculateProsTotal();
  $scope.calculateConsTotal();

  $scope.addPro = function () {
    $scope.pros.push({
      title: $scope.newPro,
      weight: 3
    });
    $scope.newPro = null;
  };

  $scope.addCon = function () {
    $scope.cons.push({
      title: $scope.newCon,
      weight: 3
    });
    $scope.newCon = null;
  };

  $scope.toggleLeftnav = function () {
    $mdSidenav('leftnav').toggle();
  };

  $scope.save = function () {
    if (!$scope.pros.length || !$scope.cons.length || !$scope.title) {
      return;
    }

    var created = prosAndConsService.create($scope.pros, $scope.cons, $scope.title);

    if(!created) {
      alert('Unable to save');
    }
    else {
      $mdToast.show(
        $mdToast.simple()
          .content('Saved')
          .position('bottom right')
          .hideDelay(3000)
      );
    }
  };
})

;

