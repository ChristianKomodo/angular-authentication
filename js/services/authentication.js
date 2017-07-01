myApp.factory('Authentication', ['$rootScope', '$firebaseObject', '$location', '$firebaseAuth', 'Auth', function($rootScope, $firebaseObject, $location, $firebaseAuth, Auth){

	var ref = firebase.database().ref();
	var auth = firebase.auth();

	auth.onAuthStateChanged(function(authUser){
		if (authUser) {
			var userRef = ref.child('users').child(authUser.uid);
			var userObj = $firebaseObject(userRef);
			$rootScope.currentUser = userObj;
		} else {
			$rootScope.currentUser = '';
		}
	});

	return {
		login: function(user) {
			auth.signInWithEmailAndPassword(
				user.email,
				user.password
			).then(function(user) {
				$location.path('/success');
			}).catch(function(error) {
				$rootScope.message = error.message;
			});
		},

		logout: function() {
			console.log("logout says auth is ", auth);
			return auth.signOut().then(function() {
				console.error("Even though we logged out, $rootScope.currentUser is still ", $rootScope.currentUser);
				// $rootScope.currentUser = null;
			}).catch(function(error) {
				console.log(error);
			});
		},

		requireAuth: function() {
			return Auth.$requireSignIn();
		},

		register: function(user) {
			auth.createUserWithEmailAndPassword(
				user.email,
				user.password
			).then(function (regUser) {
				var regRef = ref.child('users')
					.child(regUser.uid).set({
						date: firebase.database.ServerValue.TIMESTAMP,
						regUser: regUser.uid,
						firstname: user.firstname,
						lastname: user.lastname,
						email: user.email
					});
				$rootScope.message = "Welcome " + user.firstname + ", thanks for registering.";
			}).catch(function(error){
				$rootScope.message = error.message;
			});
		}
	}

}]);