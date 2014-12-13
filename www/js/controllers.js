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
