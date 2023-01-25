const request = require('request');
require('dotenv').config();
module.exports = {
    access_token: process.env.PAGE_ACCESS_TOKEN
}
module.exports = function senderAction(sender_psid) {
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
        method: "POST",
        json: {
            recipient: { id: sender_psid },
            "sender_action": "typing_on"
        }
    }, function(error, response, body) {
        if (error) {
            console.log("Error sending message: " + response.error);
        }
    });
}