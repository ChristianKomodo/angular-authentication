myApp.controller('RegistrationController', ['$scope', '$firebase', '$firebaseAuth', function($scope, $firebase, $firebaseAuth){

	var ref = firebase.database().ref();
	// var auth = $firebaseAuth();
	var auth = firebase.auth();

	$scope.login = function() {
		$scope.message = "Welcome " + $scope.user.email;
	};

	$scope.register = function() {

		auth.createUserWithEmailAndPassword(
			$scope.user.email,
			$scope.user.password
		).then(function (regUser) {
			$scope.message = "Welcome " + $scope.user.firstname + ", thanks for registering.";
		}).catch(function(error){
			$scope.message = error.message;
		});
		
	};

}]);