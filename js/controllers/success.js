myApp.controller('SuccessController', ['$scope', '$firebaseObject', function($scope, $firebaseObject){

	// var rootRef = firebase.database().ref().child('siteData');
	// var ref = rootRef.child('title');
	// $scope.siteData = $firebaseObject(ref);
	// // then do <pre> {{ siteData | json }} </pre>

	var ref = firebase.database().ref().child('siteData');
	ref.on("value", function(snapshot) {
		$scope.$apply(function() {
			$scope.siteData = snapshot.val();
		});
	});

}]);