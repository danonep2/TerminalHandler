import { IpcHandler, RendererApi } from '../main/preload'

declare global {
  interface Window {
    ipc: IpcHandler;
    api: RendererApi;
  }
}
