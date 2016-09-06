angular.module('QC', [
    'ngStorage'
]).

    controller('Sideform', function($scope,$localStorage){

        $scope.$storage = $localStorage.$default({
            x: 42
        });
    //    $scope.amount =  $localStorage.amount = "6000";
        $scope.amount = $localStorage.amount;
        $scope.duration = $localStorage.duration;
        $scope.firstanme = {};
        $scope.lastname = {}

    });