// Firstly import the necessary modules: Express to create an HTTP server, and the Matrix JavaScript SDK to interact with the Matrix server.

const express = require('express');
const app = express();
const sdk = require('matrix-js-sdk');
require('dotenv').config();

// Specifying the login credentials for the Matrix account that the bot will use.
const username = process.env.username;
const password = process.env.password;


// 1. Created a new Matrix client object with the default configuration, including the base URL of the Matrix server.
const botAccount = sdk.createClient({
    baseUrl: 'https://matrix.org'
});


// 2. Logs in to the Matrix server using the specified username and password, and retrieves the access token and user ID for the bot account. Then, a new Matrix client object is created with the access token and user ID.
botAccount.login('m.login.password', {
    user: username,
    password: password,
}).then((response) => {
    const botClient = sdk.createClient({
        baseUrl: 'https://matrix.org',
        accessToken: response.access_token,
        userId: response.user_id,
    });

    // 3. Specifies the room ID of the channel from which the messages are to be fetched
    const roomId = process.env.roomId;

    //5. Specifies the room ID of the channel from which the messages are to be fetched
    botClient.scrollback(roomId, { limit: 10 })
        .then((messages) => {
            console.log('Historical messages:');
            console.log(messages);
        })
        .catch((error) => {
            console.error('Error fetching historical messages:', error);
        });

    // 6. Started the Matrix client and register a listener for new messages in the specified room. When a new message is received, it is logged to the console
    botClient.on('Room.timeline', (event, room, toStartOfTimeline) => {
        console.log('New message:');
        console.log(event);
    });

    botClient.startClient();

    // 7. Output the messages in a readable format
    app.get('/', (req, res) => {
        res.send('Hello, world!');
    });

    // Listen Server at Port 3000
    app.listen(process.env.PORT, () => {
        console.log('Example app listening on port 3000!');
    })
}).catch((error) => {
    console.error('Failed to log in:', error);
});
