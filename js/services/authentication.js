myApp.factory('Authentication', ['$rootScope', '$firebaseObject', '$location', '$firebaseAuth', function($rootScope, $firebaseObject, $location, $firebaseAuth){

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
			return auth.signOut().then(function() {
				console.log("signed out");
			}).catch(function(error) {
				console.log(error);
			});
		},

		requireAuth: function () {
			return auth.requireSignIn();
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