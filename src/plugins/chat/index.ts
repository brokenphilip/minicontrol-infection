class ChatPlugin {
    constructor() {
        tmc.server.on("TMC.Init", this.onInit.bind(this));
        tmc.server.on("Trackmania.PlayerChat", this.onPlayerChat.bind(this));
    }

    async onInit() {
        await tmc.server.call("ChatEnableManualRouting", true, false);
    }

    async onPlayerChat(data: any) {
        if (data[0] == 0) return;
        if (data[2].startsWith("/")) return;
        const player = await tmc.getPlayer(data[1]);
        const text = data[2];
        const msg = `$fff${player.nick}$ff0 ${text}`;
        tmc.server.send("ChatSendServerMessage", msg);
        tmc.cli(msg);
    }
}

tmc.addPlugin("chat", new ChatPlugin);