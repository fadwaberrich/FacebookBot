const request = require('request');
module.exports = function botApi(received_message) {
    const text = received_message.text;
    let request = require("request");
    let options = {
        method: 'GET',
        url: 'http://127.0.0.1:5000/flask/' + text,
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json'
        },
        json: true
    };
    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
    });
}