var datenite = angular.module('starter.controllers', [])

datenite.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

datenite.controller('SearchCtrl', function($scope, $http){
    $http.get('http://api.nytimes.com/svc/events/v2/listings.json?filters=category:Dance&date_range=2014-12-13%3A2014-12-31&api-key=3c9cba411d5c02c41b1d24aae1495dbe%3A8%3A70391628').success(function(data) {
        $scope.results = data;
      });
})
datenite.controller('BrowseCtrl',  [
// function() {
    console.log('browser')
// }

])

// .controller('SearchCtrl', function($scope, $stateParams) {
// });


datenite.controller('AccordionCtrl', function($scope){
	console.log("ghrehiiu")
	$scope.groups = [];
  for (var i=0; i<5; i++) {
    $scope.groups[i] = {
      name: i,
      items: []
    };
    for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
})