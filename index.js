const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { EditPhotoHandler } = require("./feature/edit_foto");
const { ChatAIHandler } = require("./feature/chat_ai");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (msg) => {
  const text = msg.body.toLowerCase() || "";

  //check status
  if (text === "!ping") {
    msg.reply("pong");
  }

  // #ask/question?
  if (text.includes("#ask/")) {
    await ChatAIHandler(text, msg);
  }
  // #edit_bg/bg_color
  if (text.includes("#edit_bg/")) {
    await EditPhotoHandler(text, msg);
  } else if (
    text.includes(
      "halo" || "p" || "oi" || "Woi" || "assalamualaikum" || "Shalom"
    )
  ) {
    msg.reply(
      "HalooSelamat Datang\nGunakan Commmand\n#ask/pertanyaan (Untuk Bertanya)\n#edit_bg/warna (Untuk Mengubah Warna Background)\nBot Ini Dibuat Oleh Aldo"
    );
  }
});

client.initialize();
