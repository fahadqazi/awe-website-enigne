angular
    .module("sliderApp", [ 'FlexySlider', 'LocalStorageModule' ])
    .controller('FormCtrl', function ($scope, localStorageService, config) {

        $scope.metrics = {
            amount: config.labels.amount,
            months: config.labels.months
        };

        $scope.slider = { months: 3, amount: 300 };

        var i, key, keys = localStorageService.keys();

        for(i in keys) {

            if(keys.hasOwnProperty(i)) {

                key = keys[i];

                if(key === 'duration') {
                    $scope.slider['months'] = parseInt(localStorageService.get(key), 10) || 3;
                }

                if (key === 'months') {
                    continue;
                }

                $scope.slider[key] = parseInt(localStorageService.get(key), 10) || localStorageService.get(key);
            }
        }


        $scope.$watchCollection('slider', function(value)
        {
            for(var k in value)
            {
                if(value[k] && value[k] != localStorageService.get('k'))
                {
                    localStorageService.set(k, value[k]);

                    if(k === 'months') {
                        localStorageService.set('duration', value[k]);
                    }

                    if(k === 'duration') {
                        localStorageService.set('months', value[k]);
                    }
                }
            }
        });

        $scope.$on('amount', function(event, value)
        {
            $scope.$apply(function()
            {
                if(value) {
                    $scope.slider.amount = parseInt(value, 10);
                }
            });
        });

        $scope.$on('months', function(event, value)
        {
            $scope.$apply(function()
            {
                if(value) {
                    $scope.slider.months = parseInt(value, 10);
                }
            });
        });

    });