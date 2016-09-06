angular
    .module('FlexySlider')
    .factory('angles', function () {

        return {

            calculate: function (center, step, total, R) {

//                console.log('angles.calculate called');

                if (step > total) {
                    step = step - total;
                }

                var alpha = 360 / total * step,
                    a = (90 - alpha) * Math.PI / 180,
                    x = center.x + R * Math.cos(a),
                    y = center.y - R * Math.sin(a);

                return { x: Math.round(x), y: Math.round(y), angle: alpha };
            },

            calculateDistance: function (pt1, pt2) {
//                console.log('angles.calculateDistance called');
                var dx = pt1.x - pt2.x;
                var dy = pt1.y - pt2.y;
                return Math.sqrt(dx * dx + dy * dy);
            },

            findPoint: function(center, move, begin, end, R, revertX) {

//                console.log('angles.findPoint called');

                if(revertX > 0) {
                    if(move.y > end.y) {
                        move.y = end.y;
                    }

                    if(move.y < begin.y) {
                        move.y = begin.y;
                    }
                } else {
                    if(move.y < end.y) {
                        move.y = end.y;
                    }

                    if(move.y > begin.y) {
                        move.y = begin.y;
                    }
                }

                var
                    result = { x: 0, y: move.y },
                    Y = Math.abs(move.y - center.y);

                result.x = Math.round(revertX * Math.sqrt(Math.abs((R*R) - (Y*Y))) + center.x);
//                result.angle = this.findAngleBetweenPoints(center, result);

                return result;
            },

            findAngleBetweenPoints: function(center, move) {

                var reference = { x: center.x, y: 0 },
                cosine  =
                    ((move.x - center.x) * (reference.x - center.x) + (move.y - center.y) * (reference.y - center.y))
                    /
                    (Math.sqrt(Math.pow(move.x - center.x, 2) + Math.pow(move.y - center.y,2)) * Math.sqrt(Math.pow(reference.x - center.x, 2) + Math.pow(reference.y - center.y,2)));

                return Math.acos(cosine);
            },

            findClosestPoint: function(center, start, stop, total, current, R) {

//                console.log('angles.findClosestPoint called');

                var pathPoints = [], j, step;

                for (j = start; j <= stop; j++) {
                    step = this.calculate(center, j, total, R);
                    pathPoints.push({ step: j, distance: this.calculateDistance(step, current), point: step });
                }

                pathPoints.sort(function (a, b) {
                    return a.distance - b.distance;
                });

                return pathPoints[0];
            }
        };
    });