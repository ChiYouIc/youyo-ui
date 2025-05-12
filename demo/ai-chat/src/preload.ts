// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import dotenv from "dotenv";
import path from "node:path";
import {contextBridge, ipcRenderer} from 'electron'

dotenv.config({
    path: path.resolve(__dirname, ".env"),
});


contextBridge.exposeInMainWorld('mcp', {
    sendMessage: async (text: string) => {
        return await ipcRenderer.invoke('mcp:sendMessage', text);
    }
});