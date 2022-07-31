import { Client } from "whatsapp-web.js";
// import { generate } from "qrcode-terminal";

console.log(process.env);

const client = new Client();

client.on("qr", (qr) => {
  //   generate(qr, { small: true });
  console.log(qr);
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.initialize();
