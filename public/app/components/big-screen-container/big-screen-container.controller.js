app.controller('BigScreenContainerController', function (httpService, bigScreenService, reusableDataService, $filter) {
    var controller = this;
    controller.httpService = httpService;
    controller.bigScreenService = bigScreenService;
    controller.reusableDataService = reusableDataService;
});