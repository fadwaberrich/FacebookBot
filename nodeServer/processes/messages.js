const request = require('request');
const senderAction = require('../templates/senderAction');
const sendMessage = require('../templates/sendMessage');
const botapi = require('../routes/bot_py');
const { response } = require('express');
module.exports = function processMessage(sender_id, received_message) {
    botapi(received_message);
    let response;
    //check if the message contains text
    if (received_message.text) {
        //create the payload for a basic the message
        response = {
            "text": `You sent the message: "${received_message.text}". Now send me an image!`
        }
    }
    sendMessage(sender_id, response);

    /* if (!event.message.is_echo) {
        const message = event.message;
        const senderID = event.sender.id;
        console.log("Received message from senderId: " + senderID);
        console.log("Message is: " + JSON.stringify(message));
        if (message.text) {
            // now we will take the text received and send it to an food tracking API.
            // let text = message.text;
            let text = message.text;
            let request = require("request");
            let options = {
                method: 'GET',
                url: 'http://127.0.0.1:5000/flask/' + text,
                headers: {
                    'cache-control': 'no-cache',
                    'content-type': 'application/json'
                },
                body: {
                    text: text
                },
                json: true
            };
            request(options, function(error, response, body) {
                if (error) throw new Error(error);
                senderAction(senderID);
                sendMessage(senderID, body);
            });
        }
    }*/
}