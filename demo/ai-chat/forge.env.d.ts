/// <reference types="@electron-forge/plugin-vite/forge-vite-env" />
interface Window {
    mcp: {
        sendMessage: (text: string) => Promise<string>;
    };
}