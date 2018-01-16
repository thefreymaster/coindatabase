angular.module('coindbApp').service('accountService', ['$firebaseArray', '$localStorage', 'httpService', function ($firebaseArray, $localStorage, httpService) {
    var service = this;
    service.httpService = httpService;
    service.$storage = $localStorage;

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

    var ref = firebase.database().ref();
    // download the data into a local object
    service.account_data = $firebaseArray(ref);

    if(service.$storage.account_id == undefined)
    {
        service.account_data.$add({
            account_active: true
        }).then(function(ref){
            service.$storage.account_id = ref.key;
            service.$storage.account_index = service.account_data.$indexFor(ref.key);
        })
        // service.$storage.account_id = service.account_data[service.account_data.length].$id;
    }

    console.log(service.$storage);
}])