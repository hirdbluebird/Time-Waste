(function(){
	angular.module('TimeWaste')
.controller('SignupController', ['$scope', '$state', '$http', function($scope, $state, $http){
		$scope.createUser = function(){
			$http.post('api/user/signUp', $scope.newUser).success(function(responce) {
				console.log('user signed up successfuly')
			}).error(function(error){
				console.log(error);
			})
		}
	}]);
}());