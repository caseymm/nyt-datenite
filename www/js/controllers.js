var datenite = angular.module('starter.controllers', [])

datenite.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})




var venueClientID = "K2SCHC1JORKWLF3OCWGXY125Y2UXP4T2TQGCQUMLL0DCPHW5",
	venueClientSecret = "LLTMPPQOXWFMY1HRI5PPJR5QY2RGOPT4Z5YQ1XFIXROG5UL1", 
	venueLat = 40.7,
	venueLng = -74,
	venueKeywords = "bar",
	venueSection = "food", //food, drinks, coffe, shops, arts, outdoors, sights, trending or specials
	venueRadius = "600";

var directionsKey = "AIzaSyCMGssX4Zzimz6Pt1HdKO00IxIFXEHriKs";
//change origin and destination in URL to be latlong -> NOSPACES
//origin is NYT venue, destination is venueLatvenueLong
//could switch around



datenite.controller('VenuesCtrl', function($scope, $http){
	$http.get('https://api.foursquare.com/v2/venues/search?client_id='+venueClientID+'&client_secret='+venueClientSecret+'&v=20130815%20&ll='+venueLat+','+venueLng+'%20&query='+venueKeywords+'%20&section='+venueSection+'%20&radius='+venueRadius).success(function(venuesData){
		$scope.results = venuesData;
		console.log(venuesData);
	});
})

datenite.controller('DirectionsCtrl', function($scope, $http){
	$http.get('https://maps.googleapis.com/maps/api/directions/json?origin=Brooklyn&destination=Queens&key='+directionsKey+'&departure_time=now&mode=transit').success(function(directionsData){
		$scope.resultes = directionsData;
		console.log(directionsData);
	});
})


datenite.controller('SearchCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.new_query = 'Dance';
    $scope.submit = function() {
        if($scope.new_query){
            console.log(this.new_query)
             $http.get('http://api.nytimes.com/svc/events/v2/listings.json?filters=category:'+this.new_query+'&date_range=2014-12-13%3A2014-12-31&api-key=3c9cba411d5c02c41b1d24aae1495dbe%3A8%3A70391628').success(function(data) {
            $scope.results = data;
          });
        }
      };

}])

datenite.controller('BrowseCtrl',  [
// function() {
    console.log('browser')
// }

])

// .controller('SearchCtrl', function($scope, $stateParams) {
// });


datenite.controller('AccordionCtrl', function($scope){
  $scope.groups = [];
  for (var i=0; i<10; i++) {
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

