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
		})
		.when('/myshifts', {
			templateUrl: 'views/myshifts.html',
			controller: 'ScheduleController'
		})
		.otherwise({
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
		
		$scope.myShifts = [];

		$http.get('data/ninjas.json').success(function(data){
			$scope.shifts = data;

			
		});


		

	//Available shifts main functions

	$scope.removeShift = function(shift){
		var removeShift = $scope.shifts.indexOf(shift);
		
		shift.available = false;
		$scope.myShifts.push(shift);
		$scope.shifts.splice(removeShift, 1);

		
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

	$scope.removeAllAvailable = function(){
		$scope.shifts = [];
		/*for(var i = allShifts.length - 1; i >= 0; i--){
			
			allShifts.pop();
		
		
		}*/


	};

	//My shifts functions

	$scope.cancelShift = function(shift){
		var removeShift = $scope.myShifts.indexOf(shift);

		shift.available = true;
		$scope.shifts.push(shift);
		$scope.myShifts.splice(removeShift, 1);
		console.log($scope.myShifts);


	}


	$scope.removeAllMy = function(){
		
		//console.log($scope.myShifts);
		/*for(var i = 0; i < $scope.myShifts.length; i++){
			//console.log($scope.myShifts[i]);
			$scope.shifts.push($scope.myShifts[i]);
			
		}*/

		var temp = $scope.myShifts.concat($scope.shifts);

		$scope.shifts = temp;
		
		//$scope.shifts.push($scope.myShifts[0]);
		$scope.myShifts = [];
		
console.log($scope.shifts);
console.log($scope.myShifts);
	
		
		/*for(var i = allShifts.length - 1; i >= 0; i--){
			
			allShifts.pop();
		
		
		}*/


	};




}]);


/*scheduleApp.controller('myShiftsController', ['$scope',  function($scope){

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



	$scope.myShifts = [];

	

}]);*/

/*scheduleApp.controller("ContactController", ['$scope', '$location', function($scope, $location){

	$scope.sendMessage = function(){
		$location.path('/contact-success');
	}

}]);*/