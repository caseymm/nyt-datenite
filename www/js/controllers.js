var datenite = angular.module('starter.controllers', [])

datenite.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

datenite.controller('SearchCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.new_query = 'Today';
    $scope.submit = function() {
        if($scope.new_query){
            $scope.newdate = '2014-12-13';
            if(this.new_query === "Tomorrow"){
                $scope.newdate = '2014-12-14';
            }
             $http.get('http://api.nytimes.com/svc/events/v2/listings.json?&limit=10000&date_range='+$scope.newdate+'%3A'+$scope.newdate+'&api-key=3c9cba411d5c02c41b1d24aae1495dbe%3A8%3A70391628').success(function(data) {
                //  console.log(data.results);
            $scope.results = data.results;
            results_cat = [];
            // all_cats = [];
            function isInArray(value, array) {
              return array.indexOf(value) > -1;
            }
            for (i in data.results){
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
