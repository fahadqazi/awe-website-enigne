angular
    .module('FlexySlider', [])
    .provider('config', function()
    {
        var config = {
            metrics: [
                {
                    metric: 'months',
                    start: 5,
                    end: 28,
                    total: 88,
                    color: '#f2672c',
                    colorLight: '#fba63c',
                    gradient: '45-#f2672c-#fba63c',
                    verticalShift: 30
                },
                {
                    metric: 'amount',
                    start: 51,
                    end: 70,
                    total: 75,
                    color: '#7db93f',
                    colorLight: '#cdda28',
                    gradient: '135-#7db93f-#cdda28',
                    verticalShift: -20
                }
            ],
            labels: {
                amount: [
                    { id: 51, label: '£100', value: 100, constraints: { min: 6, max: 6 }, sliderLabel: "£100" },
                    { id: 52, label: '£200', value: 200, constraints: { min: 6, max: 6 }, sliderLabel: " " },
                    { id: 53, label: '£300', value: 300, constraints: { min: 6, max: 6 }, sliderLabel: " " },
                    { id: 54, label: '£400', value: 400, constraints: { min: 6, max: 6 }, sliderLabel: " " },
                    { id: 55, label: '£500', value: 500, constraints: { min: 6, max: 6 }, sliderLabel: "£500" },
                    { id: 56, label: '£600', value: 600, constraints: { min: 6, max: 6 }, sliderLabel: " " },
                    { id: 57, label: '£700', value: 700, constraints: { min: 6, max: 6 }, sliderLabel: " " },
                    { id: 58, label: '£800', value: 800, constraints: { min: 6, max: 6 }, sliderLabel: " " },
                    { id: 59, label: '£900', value: 900, constraints: { min: 6, max: 6 }, sliderLabel: " " },
                    { id: 60, label: '£1000', value: 1000, constraints: { min: 1, max: 6 }, sliderLabel: "£1000" },
                    { id: 61, label: '£1100', value: 1100, constraints: { min: 1, max: 6 }, sliderLabel: " " },
                    { id: 62, label: '£1200', value: 1200, constraints: { min: 1, max: 6 }, sliderLabel: " " },
                    { id: 63, label: '£1300', value: 1300, constraints: { min: 1, max: 6 }, sliderLabel: " " },
                    { id: 64, label: '£1400', value: 1400, constraints: { min: 1, max: 6 }, sliderLabel: " " },
                    { id: 65, label: '£1500', value: 1500, constraints: { min: 1, max: 6 }, sliderLabel: "£1500" },
                    { id: 66, label: '£1600', value: 1600, constraints: { min: 1, max: 6 }, sliderLabel: " " },
                    { id: 67, label: '£1700', value: 1700, constraints: { min: 1, max: 6 }, sliderLabel: " " },
                    { id: 68, label: '£1800', value: 1800, constraints: { min: 1, max: 6 }, sliderLabel: " " },
                    { id: 69, label: '£1900', value: 1900, constraints: { min: 1, max: 6 }, sliderLabel: " " },
                    { id: 70, label: '£2000', value: 2000, constraints: { min: 1, max: 6 }, sliderLabel: "£2000" }
                ],
                months: [
                    { id: 5, "value": 24, "label": "24 Months", sliderLabel: '24 Months'},
                    { id: 6, "value": 23, "label": "23 Months", sliderLabel: ' ' },
                    { id: 7, "value": 22, "label": "22 Months", sliderLabel: ' ' },
                    { id: 8, "value": 21, "label": "21 Months", sliderLabel: '21' },
                    { id: 9, "value": 20, "label": "20 Months", sliderLabel: ' ' },
                    { id: 10, "value": 19, "label": "19 Months", sliderLabel: ' ' },
                    { id: 11, "value": 18, "label": "18 Months", sliderLabel: '18' },
                    { id: 12, "value": 17, "label": "17 Months", sliderLabel: ' ' },
                    { id: 13, "value": 16, "label": "16 Months", sliderLabel: ' ' },
                    { id: 14, "value": 15, "label": "15 Months", sliderLabel: '15' },
                    { id: 15, "value": 14, "label": "14 Months", sliderLabel: ' ' },
                    { id: 16, "value": 13, "label": "13 Months", sliderLabel: ' ' },
                    { id: 17, "value": 12, "label": "12 Months", sliderLabel: '12' },
                    { id: 18, "value": 11, "label": "11 Months", sliderLabel: ' ' },
                    { id: 19, "value": 10, "label": "10 Months", sliderLabel: ' ' },
                    { id: 20, "value": 9, "label": "9 Months", sliderLabel: '9' },
                    { id: 21, "value": 8, "label": "8 Months", sliderLabel: ' ' },
                    { id: 22, "value": 7, "label": "7 Months", sliderLabel: ' ' },
                    { id: 23, "value": 6, "label": "6 Months", sliderLabel: '6' },
                    { id: 24, "value": 5, "label": "5 Months", sliderLabel: ' ' },
                    { id: 25, "value": 4, "label": "4 Months", sliderLabel: ' ' },
                    { id: 26, "value": 3, "label": "3 Months", sliderLabel: '3' },
                    { id: 27, "value": 2, "label": "2 Months", sliderLabel: ' ' },
                    { id: 28, "value": 1, "label": "1 Month", sliderLabel: '1 Month' }
                ]
            }
        };

        this.$get = function()
        {
            var output = config;
            output.labels['getLabelAt'] = this.getLabelAt;
            output.labels['getAt'] = this.getAt;
            return output;
        };

        this.getLabelAt = function(metric, id)
        {
            for(var i in this[metric])
            {
                if(this[metric][i].id == id)
                    return this[metric][i].label;
            }

            return undefined;
        };

        this.getAt = function(metric, id)
        {
            for(var i in this[metric])
            {
                if(this[metric][i].id == id)
                    return this[metric][i];
            }

            return undefined;
        };

        this.setConfig = function(newValue)
        {
            this.config = newValue;
        }
    });;angular
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
    }]);;angular
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
    });;angular
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
    });;angular
    .module('FlexySlider')
    .factory('illustrator', ['config', 'angles', function (config, angles) {

        return {
            drawHandle: function (paper, center, point, color) {

                var handle = paper.set();

                handle
                    .push(
                    paper
                        .circle(point.x, point.y, 30)
                        .attr('fill', '#ccc')
                        .attr('stroke', '#ccc')
                    ,
                    paper
                        .circle(point.x, point.y, 26)
                        .attr('fill', '#bbb')
                        .attr('stroke', '#bbb')
                    ,
                    paper
                        .circle(point.x, point.y, 14)
                        .attr('fill', '#aaa')
                        .attr('stroke', '#aaa')
                    ,
                    paper
                        .circle(point.x, point.y, 10)
                        .attr('fill', color)
                        .attr('stroke', 'none')
//                    ,
//                    /**
//                     * triangle
//                     */
//                    paper
//                        .path("M310,"+point.y+",L,314,"+(point.y + 5)+",L314,"+(point.y - 5)+",z")
//                        .attr({'fill':'#ccc', 'stroke': '#ccc'})
////                        .rotate(point.angle + 90, center.x, center.y)
                );

                return handle;
            },

            drawCircularLabels: function (paper, point, labels, shift, steps) {
                shift = shift || 0; steps = steps || 12;

                var amounts = paper.set();

                var radius = {
                    arc: paper.canvas.offsetWidth > 550 ? 200 : 120
                };
                var font = paper.canvas.offsetWidth > 550 ? '18px' : '12px';

                for (var item in labels) {
                    if (labels.hasOwnProperty(item)) {
                        var label = labels[item].sliderLabel || labels[item].label;
                        if (label.length < 3)
                            label += '          ';

                        var location = angles.calculate(point, labels[item].id, steps, radius.arc);

                        amounts.push(paper.text(location['x'] + shift, location['y'], label.replace(/ /g, '\u00a0')));
                    }
                }

                amounts
                    .attr({font: '"Open Sans", sans-serif', fill: "#999", "text-align": "right"})
                    .attr('font-size', font)
                ;

                return amounts;
            },

            drawCircles: function (paper, point) {

                var circles = paper.set(),
                    radius = {
                        innerWhite: paper.canvas.offsetWidth > 550 ? 110 : 50,
                        innerBlue: paper.canvas.offsetWidth > 550 ? 105 : 45
                    };

                circles.push(

                    /**
                     * inner white circle with shadow
                     */
                    paper
                        .circle(point.x, point.y, radius.innerWhite)
                        .attr("fill", "#fff")
                        .attr("stroke", "#fff")
                        .glow({ color: "#ccc", width: 10 })
                    ,
                    /**
                     * inner blue circle
                     */
                    paper
                        .circle(point.x, point.y, radius.innerBlue)
                        .attr("fill", "#1d76ba")
                        .attr("stroke", "#1d76ba")

                );

                return circles;
            },

            drawCentralLabel: function (metric, paper, point, amount) {
                return this['drawCentralLabel' + metric[0].toUpperCase() + metric.slice(1)](paper, point, amount);
            },

            drawCentralLabelAmount: function (paper, point, amount) {
                var font = {
                        normal: paper.canvas.offsetWidth > 550 ? '24px' : '12px',
                        big: paper.canvas.offsetWidth > 550 ? '36px' : '18px',
                        spacing: paper.canvas.offsetWidth > 550 ? 40 : 20
                    },
                    label = paper.set();

                label.push(
                    paper.set(),
                    paper.set()
                );

                label[0].push(
                    paper.text(point.x, point.y - (font.spacing * 2) + (font.spacing / 2), "Borrow")
                ).attr("opacity", 0.7);

                label[1].push(
                    paper.text(point.x, point.y - font.spacing + (font.spacing / 2), amount)
                );

                label
                    .attr({font: '"Open Sans", sans-serif', fill: "#fff", "text-align": "center"})
                    .attr('font-size', font.normal)
                ;

                label[1].attr("font-weight", 'bold').attr('font-size', '30px');
                label[1][0].attr("font-size", font.big);

                return label;
            },

            drawCentralLabelMonths: function (paper, point, months) {

                var font = {
                    normal: paper.canvas.offsetWidth > 550 ? '24px' : '12px',
                    big: paper.canvas.offsetWidth > 550 ? '30px' : '14px',
                    spacing: paper.canvas.offsetWidth > 550 ? 30 : 15
                };

                var label = paper.set();

                label.push(
                    paper.set(),
                    paper.set()
                );

                label[0].push(
                    paper.text(point.x, point.y + font.spacing - (font.spacing / 2), "for")
                ).attr("opacity", 0.7);

                label[1].push(
                    paper.text(point.x, point.y + (font.spacing * 2) - (font.spacing / 2), months)
                );

                label
                    .attr({font: '"Open Sans", sans-serif', fill: "#fff", "text-align": "center"})
                    .attr("font-size", font.normal)
                ;

                label[1].attr("font-weight", 'bold');
                label[1][0].attr("font-size", font.big);

                return label;
            },

            drawWidget: function (paper, point, model) {

                paper.clear();

                var mainLabels = {},
                    circles = this.drawCircles(paper, point),
                    R = paper.canvas.offsetWidth > 550 ? 161 : 90,
                    i,
                    step,
                    revertX,
                    backgroundStart = 1,
                    backgroundStop = 8
                ;

                /**
                 * arcs and handles
                 */
                for (i in config.metrics) {

                    if (config.metrics.hasOwnProperty(i)) {

                        revertX = ((config.metrics[i].total / 2 - config.metrics[i].end) >= 0) ? 1 : -1;

                        if(revertX < 0) {

                            backgroundStart += 15;
                            backgroundStop += 15;
                        }

                        circles.push(paper
                            .path()
                            .attr({
                                "stroke": '#ddd',
                                "stroke-width": 48,
                                "stroke-linecap": "round",
                                arc: [ point, backgroundStart, backgroundStop, 24, R]
                            })
                        );
                        circles.push(paper
                            .path()
                            .attr({
                                "stroke": '#eee',
                                "stroke-width": 44,
                                "stroke-linecap": "round",
                                arc: [ point, backgroundStart, backgroundStop, 24, R]
                            })
                            .glow({ color: "#666", width: 4 })
                        );

                        circles.push(paper
                                .path()
                                .attr({
                                    "stroke": config.metrics[i].color,
                                    "stroke-width": 44,
                                    "stroke-linecap": "round",
                                    arc: [ point, config.metrics[i].start, config.metrics[i].end, config.metrics[i].total, R]
                                })
                        );

                        circles.push(paper
                                .path()
                                .attr({
                                    "stroke": config.metrics[i].color,
                                    "stroke-width": 40,
                                    "stroke-linecap": "round",
                                    "stroke-opacity": 0,
                                    arc: [ point, config.metrics[i].start, config.metrics[i].end, config.metrics[i].total, R]
                                })
                                .glow({ color: config.metrics[i].colorLight, width: 4 })
                        );

                        for (var j in config.labels[config.metrics[i].metric])
                            if (config.labels[config.metrics[i].metric][j].value == model[config.metrics[i].metric])
                                step = config.labels[config.metrics[i].metric][j].id;

                        if (step > config.metrics[i].end) step = config.metrics[i].end;
                        if (step < config.metrics[i].start) step = config.metrics[i].start;

                        this
                            .drawHandle(
                            paper,
                            point,
                            angles.calculate(point, step, config.metrics[i].total, R),
                            config.metrics[i].gradient
                        )
                        .draggable(point, R, config.metrics[i].start, config.metrics[i].end, config.metrics[i].total, revertX, config.metrics[i].metric);

                        mainLabels[config.metrics[i].metric] = this.drawCentralLabel(config.metrics[i].metric, paper, point, config.labels.getLabelAt(config.metrics[i].metric, step));

                        this.drawCircularLabels(paper, point, config.labels[config.metrics[i].metric], config.metrics[i].verticalShift, config.metrics[i].total);
                    }
                }
            }
        }
    }]);;angular
    .module('FlexySlider')
    .factory('widgetDrawer', ['illustrator', 'angles', 'arc', 'config', '$rootScope', function (illustrator, angles, arc, config, $rootScope) {

        return function (element, model, paper) {

            var canvas = paper || new Raphael(element);

            if( ! paper) {
                canvas.customAttributes.arc = arc;
                canvas.setSize(element.offsetWidth, element.offsetWidth > 500 ? 400 : 250);
            }

            Raphael.st.draggable = function (center, R, start, stop, total, revertX, metric) {
                var me = this,
                    ox = 0,
                    oy = 0,
                    current = {x: 0, y: 0},
                    //currentLabel,
                    begin = angles.calculate(center, start, total, R),
                    end = angles.calculate(center, stop, total, R),
                    onmove = function (dx, dy) {

                        var pt = angles.findPoint(center, { x: ox + dx, y: oy + dy }, begin, end, R, revertX);//,
                        //label = config.labels.getAt(metric, angles.findClosestPoint(center, start, stop, total, current, R).step).value;

//                        if(currentLabel !== label) {
//                            $rootScope.$broadcast(metric, label);
//                            currentLabel = label;
//                        }

                        current = pt;
                        me.attr({ cx: pt.x, cy: pt.y });
//                        console.log(pt);
//                        me.rotate(pt.angle, center.x, center.y);
                    },
                    onstart = function () {
                        ox = me[0].attr("cx");
                        oy = me[0].attr("cy");
                    },
                    onend = function () {

                        var
                            R = canvas.canvas.offsetWidth > 550 ? 151 : 90,
                            i,
                            closest;

                        for (i in config.metrics) {

                            if (config.metrics[i].metric != metric) continue;

                            closest = angles.findClosestPoint(center, start, stop, total, current, R);

                            me.attr({ cx: closest.point.x, cy: closest.point.y });
                            $rootScope.$broadcast(metric, config.labels.getAt(metric, closest.step).value);
                        }
                    };

                this.drag(onmove, onstart, onend);
            };

            var point = { x: element.offsetWidth / 2, y: ( element.offsetWidth > 500 ? 400 : 250) / 2 };
            illustrator.drawWidget(canvas, point, model);

            return canvas;
        }
    }]);