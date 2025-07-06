import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'

const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value)
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
      callback(...args)
    ipcRenderer.on(channel, subscription)

    return () => {
      ipcRenderer.removeListener(channel, subscription)
    }
  },
}

contextBridge.exposeInMainWorld('ipc', handler)

contextBridge.exposeInMainWorld('api', {
  iniciarComandoWatch: (json) => ipcRenderer.send('comando-watch-iniciar', json),
  pararComandoWatch: (json) => ipcRenderer.send('comando-watch-parar', json),
  onSaida: (callback) => ipcRenderer.on('comando-watch-saida', (_, data) => callback(data)),
  onFim: (callback) => ipcRenderer.on('comando-watch-fim', (_, msg) => callback(msg)),
  resetAllHandles: () => ipcRenderer.send('reset-all-handles')
});

export type IpcHandler = typeof handler
