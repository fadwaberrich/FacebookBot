const processPostback = require('../processes/postback');
const processMessage = require('../processes/messages');
const { handle } = require('express/lib/application');
require('dotenv').config();
module.exports = {
    VERIFY_TOKEN: process.env.VERIFY_TOKEN
}

module.exports = function(app, chalk) {
    app.get('/webhook', function(req, res) {
        if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
            console.log('webhook verified');
            res.status(200).send(req.query['hub.challenge']);
        } else {
            console.error('verification failed. Token mismatch.');
            res.sendStatus(403);
        }
    });

    app.post('/webhook', function(req, res) {
        let body = req.body;
        //checking for page subscription.
        if (body.object === 'page') {

            body.entry.forEach(function(entry) {
                //get the webhook event.entry.messaging is  an array, but will only ever 
                //contain one event, so we get index 0
                let webhook_event = entry.messaging[0];
                console.log(webhook_event);

                //get the sender psid 
                let sender_psid = webhook_event.sender.id;
                console.log('Sender PSID:' + sender_psid);

                //check if the event is a message or postback and
                //pass the event to the appropriate handker function
                if (webhook_event.message) {
                    processMessage(sender_psid, webhook_event.message)
                } else if (webhook_event.postback) {
                    processPostback(sender_psid, webhook_event.postback)
                }
            });
            //return a '200 ok ' response to all events
            res.status(200).send('EVENT_RECEIVED');
        } else {
            //return a' 404 not found' if event is not from a page 
            res.sendStatus(404);

        }

        /* Iterate over each entry, there can be multiple entries 
        if callbacks are batched. */
        /*  body.entry.forEach(function(entry) {
              // Iterate over each messaging event
              entry.messaging.forEach(function(event) {
                  console.log(event);
                  if (event.postback) {
                      processPostback(event);
                  } else if (event.message) {
                      processMessage(event);
                  }
              });
          });
          res.sendStatus(200);*/
        // }
    });
}