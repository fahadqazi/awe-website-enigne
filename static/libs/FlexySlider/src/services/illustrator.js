angular
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
    }]);