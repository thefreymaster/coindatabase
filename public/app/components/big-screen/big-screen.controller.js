app.controller('BigScreenController', function (bigScreenService) {
     var controller = this;
     controller.bigScreenService = bigScreenService;
     controller.loadingPrice = false;
     controller.series = ['Bitcoin'];
        controller.data = [
                controller.historic_prices
        ];
        controller.onClick = function (points, evt) {
            console.log(points, evt);
        };


        controller.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
        controller.options = {
            scales: {
            yAxes: [
                {
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left'
                },
                {
                id: 'y-axis-2',
                type: 'linear',
                display: false,
                position: 'right'
                }
            ]
            },
            elements: {
                    point: {
                        radius: 0
                    }
                },
        };
 });