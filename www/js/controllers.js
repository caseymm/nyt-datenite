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
    today = new Date();
    dd = today.getDate();
    mm = today.getMonth()+1; //January is 0!
    yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }
    today = yyyy+'-'+mm+'-'+dd;
    tomorrow = yyyy+'-'+mm+'-'+String(parseInt(dd)+1);

    // $scope.new_query = 'Today';
    $scope.date_start = today;
    $scope.date_end = tomorrow;
    $scope.submit = function() {
        if($scope.date_start){ $http.get('http://api.nytimes.com/svc/events/v2/listings.json?&limit=10000&date_range='+this.date_start+'%3A'+this.date_end+'&api-key=3c9cba411d5c02c41b1d24aae1495dbe%3A8%3A70391628').success(function(data) {
                //  console.log(data.results);
            $scope.results = data.results;
            console.log(data.results.slice(0,1))
            results_cat = [];
            // all_cats = [];
            function isInArray(value, array) {
              return array.indexOf(value) > -1;
            }
            for (i in data.results){
                data.results[i].recur_days = String(data.results[i].recur_days).replace('[','').replace(']','').split(',').join(', ');
                if(data.results[i].category != "Movies"){
                    if (!(isInArray(data.results[i].category, results_cat))){
                        results_cat.push(data.results[i].category);
                    }
                }

            }
            cat_result_lol = [];
            for (f in results_cat){
                jj = [];
                for (i in data.results){
                    if(data.results[i].category === results_cat[f]){
                        jj.push(data.results[i]);
                    }
                }
                cat_result_lol.push({"name":results_cat[f], "res":jj});
            }
            $scope.lol = cat_result_lol;
            // $scope.onelist = all_cats;

          });
        }
      };

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
  for (var i=0; i<5; i++) {
  $scope.groups = [];
  }
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
