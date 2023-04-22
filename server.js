const { MatrixClient, MemoryStorageProvider, AutojoinRoomsMixin } = require("matrix-bot-sdk");
const { MatrixAuth } = require("matrix-bot-sdk");

const homeserverUrl = 'https://matrix.org';
const username = "@nitin04sep:matrix.org";
const password = "nitinverma@";
const roomId = "!wOlkWNmgkAZFxbTaqj:matrix.org";

async function runBot() {
    const auth = new MatrixAuth(homeserverUrl);
    const clientBot = await auth.passwordLogin(username, password);
    const accessToken = clientBot.accessToken;
    const storage = new MemoryStorageProvider();

    const client = new MatrixClient(homeserverUrl, accessToken, storage);
    AutojoinRoomsMixin.setupOnClient(client);

    await client.joinRoom(roomId);

    client.on("room.message", (roomId, event) => {
        handleCommand(client, roomId, event);
    });

    await client.start();
    console.log("Bot started!");
}

async function handleCommand(client, roomId, event) {
    if (event['type'] !== 'm.room.message') return;
    if (event['sender'] === client.getUserId()) return;

    const content = event['content'];
    if (content['msgtype'] !== 'm.text') return;

    const body = content['body'];
    console.log(`Received message: ${body}`);

    if (!body?.startsWith("!xyz")) return;

    console.log(roomId);
    await client.sendNotice(roomId, "XYZ! Hello XYZ");
}



// Register and invite the bot, then start the bot
runBot().catch((err) => console.error(err));
