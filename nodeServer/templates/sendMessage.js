const request = require('request');
require('dotenv').config();
module.exports = {
    access_token: process.env.PAGE_ACCESS_TOKEN
}
module.exports = function sendMessage(sender_psid, received_message) {

    return new Promise(function(resolve, reject) {
        request({
            url: "https://graph.facebook.com/v2.6/me/messages",
            qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
            method: "POST",
            json: {
                recipient: { id: sender_psid },
                message: received_message,
            }
        }, function(error, response, body) {
            if (error) {
                console.log("Error sending message: " + response.error);
                reject(response.error);
            } else {
                resolve(body);
            }
        });
    })
}