import { Client } from "discord-rpc";
import { getConfig } from "./config";

export var rpc: Client;

export async function connectRPC() {
    if (!getConfig().discordRPC) return;

    try {
        rpc = new Client({ transport: "ipc" });

        rpc.on("ready", () =>
            rpc.setActivity({
                state: "uwucord.chat",
                details: "Chatting with others",
                largeImageKey: "qr",
                largeImageText: "Communication is critical – use uwucord.",
                buttons: [
                    {
                        label: "Join uwucord",
                        url: "https://app.uwucord.chat/",
                    },
                    { label: "Website", url: "https://uwucord.chat" },
                ],
            }),
        );

        // @ts-ignore
        rpc.on("disconnected", reconnect);

        rpc.login({ clientId: "872068124005007420" });
    } catch (err) {
        reconnect();
    }
}

const reconnect = () => setTimeout(() => connectRPC(), 1e4);

export async function dropRPC() {
    rpc?.destroy();
}
