myApp.controller('SuccessController', ['$scope', '$firebaseObject', function($scope, $firebaseObject){

	var database = firebase.database();

	var starCountRef = firebase.database().ref('siteData').child('title');
	starCountRef.on('value', function(snapshot) {
		console.log("siteData snapshot is ", snapshot);
		$scope.title = snapshot.val();
	});

}]);