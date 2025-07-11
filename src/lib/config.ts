import type { ConfigData } from "../app";

import { autoLaunch } from "./autoLaunch";
import { connectRPC } from "./discordRPC";
import Store from "electron-store";
import { app } from "electron";

export const store = new Store<{ config: Partial<ConfigData> }>();

export async function firstRun() {
    if (store.get("firstrun", false)) return;

    // Enable auto start by default on Windows / Mac OS.
    if (process.platform === "win32" || process.platform === "darwin") {
        const enabled = await autoLaunch.isEnabled();
        if (!enabled) {
            await autoLaunch.enable();
        }
    }

    store.set("firstrun", true);
}

export function getConfig(): ConfigData {
    const defaults: ConfigData = {
        build: "stable",
        frame: process.platform !== "win32",
        discordRPC: false,
        minimiseToTray: true,
        hardwareAcceleration: true,
    };

    return Object.assign({} as any, defaults, store.get("config"));
}

export function onStart() {
    const config = getConfig();

    if (!config.hardwareAcceleration) {
        app.disableHardwareAcceleration();
    }

    if (config.discordRPC) {
        connectRPC();
    }
}

export function getBuildURL() {
    const build: "stable" | "nightly" | "dev" = getConfig().build;

    // Check for custom server URL from environment or command line
    const customServer = process.env.CUSTOM_SERVER_URL || process.argv.find(arg => arg.startsWith('--server='))?.split('=')[1];
    if (customServer) {
        return customServer;
    }

    // Check for uwucord Vercel deployment
    const uwucordVercel = "https://frontend-client-git-main-lbharri2-k12wvus-projects.vercel.app";

    switch (build) {
        case "dev":
            return uwucordVercel;
        case "nightly":
            return "https://nightly.revolt.chat";
        default:
            return uwucordVercel; // Use your Vercel deployment as default
    }
}

// Add network connectivity check
export async function checkNetworkConnectivity(): Promise<boolean> {
    try {
        const { net } = require("electron");
        const request = net.request("https://app.revolt.chat");
        
        return new Promise((resolve) => {
            request.on("response", () => {
                resolve(true);
            });
            
            request.on("error", () => {
                resolve(false);
            });
            
            request.end();
        });
    } catch (error) {
        console.error("Network connectivity check failed:", error);
        return false;
    }
}
