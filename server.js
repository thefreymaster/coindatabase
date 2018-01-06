var http = require("http");
var https = require("https");
var express = require('express');

var tls = require('tls');
var fs = require('fs');
var cmd=require('node-cmd');

var request = require("request");
var bodyParser = require('body-parser');


var bodyParser = require('body-parser');


var app = express();
var port = 5500;
app.listen(process.env.PORT || port, function () { 
    console.log('Running REST HTTPS server on port: '+port);
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(__dirname + '/public'));

app.get('/', function (request, response){
    response.sendFile(path.resolve(__dirname, '/public', 'index.html'));
});

app.get('/api/top_cryptos', function(req, res){

    var options = { 
            method: 'GET',
            url: 'https://api.coinmarketcap.com/v1/ticker/?limit=150'
        };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);
        res.json(JSON.parse(body));
    });

});

app.get('/api/all', function(req, res){

    var options = { 
            method: 'GET',
            url: 'https://min-api.cryptocompare.com/data/all/coinlist'
        };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);
        res.json(JSON.parse(body));
    });

});

app.get('/api/current_price/:symbol', function(req, res){

    var symbol = req.params;
    console.log(symbol);
    var options = { 
        method: 'GET',
        url: 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + req.params.symbol + '&tsyms=USD'

        };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

        res.json(JSON.parse(body));
    });

});
    app.get('/api/top_volumns', function(req, res){
    

        var options = { 
            method: 'GET',
            url: 'https://min-api.cryptocompare.com/data/top/volumes?tsym=ETH'
    
            };
    
        request(options, function (error, response, body) {
        if (error) throw new Error(error);
    
            res.json(JSON.parse(body));
        });
    
    });

    app.get('/api/all_prices/:symbols', function(req, res){
        

            var options = { 
                method: 'GET',
                url: 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + req.params.symbols + '&tsyms=USD'
        
                };
        
            request(options, function (error, response, body) {
            if (error) throw new Error(error);
        
                res.json(JSON.parse(body));
            });
        
        });

    app.get('/api/history/byday/:symbol', function(req, res){
        

            var options = { 
                method: 'GET',
                url: 'https://min-api.cryptocompare.com/data/histoday?fsym=' + req.params.symbol + '&tsym=USD'
        
                };
        
            request(options, function (error, response, body) {
            if (error){
                // throw new Error(error);
                res.send(error);
                console.log(error)
                req.end();
                
            }
            else{
                if(body.includes("502 Bad Gateway") == true)
                {
                    res.sendStatus(502);
                }
                else{
                    res.json(JSON.parse(body));
                }
                
            }
        
                
            });
        
        });

// app.get('/api/time', function(req, res){

//     var options = { 
//         method: 'GET',
//         url: 'https://api.coinbase.com/v2/time'

//         };

//     request(options, function (error, response, body) {
//     if (error) throw new Error(error);

//         res.json(JSON.parse(body));
//     });

// });




