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

const rendererApi = {
  iniciarComandoWatch: (json) => ipcRenderer.send('comando-watch-iniciar', json),
  pararComandoWatch: (json) => ipcRenderer.send('comando-watch-parar', json),
  onSaida: (callback) => ipcRenderer.on('comando-watch-saida', (_, data) => callback(data)),
  onFim: (callback) => ipcRenderer.on('comando-watch-fim', (_, data) => callback(data)),
  killAllHandles: () => ipcRenderer.send('kill-all-handles'),
  selecionarPasta: () => ipcRenderer.invoke('selecionar-pasta'),
  saveData: (data) => ipcRenderer.send('save-data', data),
  getData: () => ipcRenderer.invoke('get-data'),
  openInTerminal: (directory) => ipcRenderer.send('open-in-terminal', directory),
}

contextBridge.exposeInMainWorld('api', rendererApi);

export type IpcHandler = typeof handler
export type RendererApi = typeof rendererApi
