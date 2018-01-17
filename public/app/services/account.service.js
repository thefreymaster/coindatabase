angular.module('coindbApp').service('accountService', ['$firebaseArray', '$localStorage', 'httpService', '$firebaseObject', '$window', 'bigScreenService', '$mdDialog', '$mdBottomSheet', function ($firebaseArray, $localStorage, httpService, $firebaseObject, $window, bigScreenService, $mdDialog, $mdBottomSheet) {
    var service = this;
    service.httpService = httpService;
    service.$storage = $localStorage;
    service.submitting = false;
    service.bigScreenService = bigScreenService;

    console.log('Account Data Service');



    var config = {
        apiKey: "AIzaSyBMCy7gYhKADw4tQNKsk_Wx7rnxgEMEQFU",
        authDomain: "coindatabase-54d75.firebaseapp.com",
        databaseURL: "https://coindatabase-54d75.firebaseio.com",
        projectId: "coindatabase-54d75",
        storageBucket: "coindatabase-54d75.appspot.com",
        messagingSenderId: "357194858436"
    };
    firebase.initializeApp(config);


    if (service.$storage.account_id == undefined) {
        var ref = firebase.database().ref();
        // download the data into a local object
        service.account_data = $firebaseArray(ref);
        //wait for response from firebase
        service.account_data.$loaded(function () {
            service.account_data.$add({
                account_active: true                
            }).then(function (ref) {
                service.$storage.account_id = ref.key;
                service.$storage.account_index = service.account_data.$indexFor(ref.key);
                var ref = firebase.database().ref(service.$storage.account_id);
                service.account_data = $firebaseObject(ref);
                console.log(service.account_data);
            })
        })
    }
    else{
        var ref = firebase.database().ref(service.$storage.account_id);
        // download the data into a local object
        service.account_data = $firebaseObject(ref);
        service.account_data.$loaded(function () {
            console.log(service.account_data);
        })
    }

    // var ref = firebase.database().ref(service.$storage.account_id);
    // // download the data into a local object
    // service.account_data = $firebaseArray(ref);

    // //wait for response from firebase
    // service.account_data.$loaded(function () {
    //     var user_account = service.account_data.$getRecord(service.$storage.account_id);
    //     if (user_account == null) {
    //         service.account_data.$add({
    //             account_active: true
    //         }).then(function (ref) {
    //             service.$storage.account_id = ref.key;
    //             service.$storage.account_index = service.account_data.$indexFor(ref.key);
    //             user_account = service.account_data.$getRecord(service.$storage.account_id);
    //             console.log(user_account);
    //         })
    //     }
    // })

    service.changedAccountID = function(newID){
        $mdBottomSheet.hide();
        $mdDialog.hide();
        service.submitting = true;
        service.bigScreenService.bigScreenItem.loading = true;
        service.$storage.account_id = newID;
        console.log('Account_ID has been changed, refreshing page');
        setTimeout(function(){
            $window.location.reload();
        }, 3000)
    }

    console.log(service.$storage);
}])