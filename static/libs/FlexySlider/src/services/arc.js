angular
    .module('FlexySlider')
    .factory('arc', function (angles) {

        return function (point, start, end, total, R) {

//            console.log('arc function called');

            if (end < start) {
                throw new RangeError("start value must be less or equal to end value.")
            }

            if (start == end) {
                start = start - (total * 0.02);
                end = end + (total * 0.02);
            }

            var
                a = angles.calculate(point, start, total, R),
                b = angles.calculate(point, end, total, R),
                path = [
                    [ "M", a.x, a.y ],
                    [ "A", R, R, 0, +(b.angle - a.angle > 180), 1, b.x, b.y ]
                ];

            return { path: path };
        };
    });