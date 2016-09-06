angular
    .module('FlexySlider')
    .directive("sliderWidget", [ 'widgetDrawer', '$window', function (draw, $window) {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function ($scope, element, attr, ngModelCtrl) {

                if (!ngModelCtrl) { return; }


                $scope.$on('amount', function(event, value)
                {
                    ngModelCtrl.$setViewValue({ amount: parseInt(value, 10), months: ngModelCtrl.$modelValue.months || 1 });
                    $scope.canvas = draw(element[0], ngModelCtrl.$viewValue, $scope.canvas);
                });

                $scope.$on('months', function(event, value)
                {
                    ngModelCtrl.$setViewValue({ amount: ngModelCtrl.$modelValue.amount || 300, months: parseInt(value, 10) });
                    $scope.canvas = draw(element[0], ngModelCtrl.$viewValue, $scope.canvas);
                });

                $scope.$watchCollection('[ amount, months ]', function () {

                    $scope.canvas = draw(element[0], ngModelCtrl.$viewValue, $scope.canvas);
                });

                $window.onresize = function () {

                    console.log(arguments);

                    $scope.canvas = draw(element[0], ngModelCtrl.$viewValue, $scope.canvas);
                };
            }
        }
    }]);