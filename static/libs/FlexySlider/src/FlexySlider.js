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
    });