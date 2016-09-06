angular
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