Matrix Bot
This is a Node.js application that logs into a Matrix server using a bot account, retrieves the historical and new messages from a specified room and logs them to the console.

Getting started-
1. Clone the repository to your local machine.
2. Install the dependencies by running npm install command.
3. Create a .env file in the root directory of the project and specify the following variables:
        • username: The username of the Matrix account that the bot will use.
        • password: The password of the Matrix account that the bot will use.
        • roomId: The room ID of the channel from which the messages are to be fetched.
        • PORT: The port number on which the server will run.

4. Run the application using the command npm start.

Dependencies-
•	Express: A web framework for Node.js
•	Matrix JavaScript SDK: A JavaScript client for the Matrix protocol.
•	dotenv: A zero-dependency module that loads environment variables from a .env file into process.env.

How it works- 
1.	A new Matrix client object is created with the default configuration, including the base URL of the Matrix server.
2.	The bot logs in to the Matrix server using the specified username and password, and retrieves the access token and user ID for the bot account. Then, a new Matrix client object is created with the access token and user ID.
3.	The room ID of the channel from which the messages are to be fetched is specified.
4.	The historical messages are fetched from the specified channel using the scrollback() method.
5.	The Matrix client is started and a listener is registered for new messages in the specified room. When a new message is received, it is logged to the console.
6.	An HTTP server is created using Express and messages are output in a readable format at the root URL. The server is set to listen on the specified port number.
