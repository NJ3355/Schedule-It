var scheduleApp = angular.module('scheduleApp', ['ngRoute', 'ngAnimate']);

scheduleApp.config(['$routeProvider', function($routeProvider){

	$routeProvider
		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'scheduleController'
		})
		.when('/contact', {
			templateUrl: 'views/contact.html',
			controller: 'ContactController'
		})
		.when('/contact-success', {
			templateUrl: 'views/contact-success.html',
			controller: 'ContactController'
		})
		.when('/available', {
			templateUrl: 'views/available.html',
			controller: 'ScheduleController'
		}).otherwise({
			redirectTo: '/home'
		});

}]);

scheduleApp.directive('randomNinja', [function(){

	return {
		restrict: 'E',
		scope: {
			ninjas: '=',
			title: '='
		},
		templateUrl: 'views/random.html',
		transclude: true,
		replace:true,
		controller: function($scope){
			$scope.random =  Math.floor(Math.random() * 3)

		}
	};

}]);

scheduleApp.controller('ScheduleController', ['$scope', '$http', function($scope, $http){

	$scope.removeShift = function(shift){
		var removeShift = $scope.shifts.indexOf(shift);
		//$scope.shifts.splice(removeShift, 1);
		//$scope.shifts[removeShift].available = false;
		shift.available = false;
		console.log($scope.shifts[removeShift]);
	};

	$scope.addShift = function() {
		$scope.shifts.push({
			name: $scope.newshift.name,
			date: $scope.newshift.date,
			rate: parseInt($scope.newshift.rate),
			available: true
		});

		$scope.newshift.name = '';
		$scope.newshift.date = '';
		$scope.newshift.rate = '';

	};

	$scope.removeAll = function(){
		
		for(var i = 0; i < $scope.shifts.length; i++){
		$scope.shifts[i].available = false;
		}

		//$scope.shifts = [];

	};



	$http.get('data/ninjas.json').success(function(data){
		$scope.shifts = data;
	});

}]);

/*scheduleApp.controller("ContactController", ['$scope', '$location', function($scope, $location){

	$scope.sendMessage = function(){
		$location.path('/contact-success');
	}

}]);*/