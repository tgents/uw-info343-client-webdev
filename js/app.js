/* 
    app.js
    Angular application for the address book challenge

    Add code here to create a new Angular application and controller.
    The array of employee objects is already in a global variable named 'pawneeEmployees'
*/

angular.module('AddressBook', [])
	.controller('AddressController', function($scope){
		$scope.employees = pawneeEmployees;
		$scope.sortCol = 'lastName';
		$scope.searchString = '';

		$scope.sortBy = function(colName){
			$scope.sortReverse = $scope.sortCol == colName ? !$scope.sortReverse : false; 
			$scope.sortCol = colName;
		}
	});
