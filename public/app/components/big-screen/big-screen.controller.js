app.controller('BigScreenController', function (bigScreenService, mediaService, $state, $localStorage, reusableDataService) {
    var controller = this;
    controller.bigScreenService = bigScreenService;
    controller.reusableDataService = reusableDataService;

    controller.mediaService = mediaService;
    controller.loadingPrice = false;
    controller.state = $state;
    controller.$storage = $localStorage;

    controller.data = [];




    controller.series = ['Bitcoin'];

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
                radius: 5
            }
        },
    };
});