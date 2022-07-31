import { Client, LocalAuth, MessageMedia } from "whatsapp-web.js";
import { generate } from "qrcode-terminal";
import { acceptGame, initGame, move } from "./game";

const client = new Client({
  authStrategy: new LocalAuth(),
});

/* Generating a QR code for the user to scan. */
client.on("qr", (qr) => {
  generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (message) => {
  const body = message.body;

  console.log(message);

  if (body.includes("!chess::init::")) {
    const white = message.author!;
    const black = message.mentionedIds[0];
    const msg = initGame({ white, black });
    if (msg) {
      await message.reply(msg + "");
    }
  } else if (body.includes("!chess::accept::")) {
    const [, code] = body.split("!chess::accept::");
    const { data, error } = await acceptGame({
      user: message.author!,
      id: parseInt(code),
    });

    if (error) {
      await message.reply(error);
    } else if (data) {
      const { filePath, moves } = data;

      const media = MessageMedia.fromFilePath(filePath);
      await client.sendMessage(message.author!, media);
      await message.reply(moves);
    }
  } else if (body.includes("!chess::move::")) {
    const [, restMsg] = body.split("!chess::move::");
    const [moving] = restMsg.split("::");
    console.log("moving:", moving);
    const user1 = message.author!;
    const user2 = message.mentionedIds[0];
    const { data, error } = await move([user1, user2], moving);

    if (error) {
      await message.reply(error);
    } else if (data) {
      const { filePath, moves } = data;

      const media = MessageMedia.fromFilePath(filePath);
      await client.sendMessage(message.author!, media);
      await message.reply(moves);
    } else {
      await message.reply("NO CONTROLLED");
    }
  }
});

client.initialize();
