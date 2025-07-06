import path from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import { spawn } from 'child_process'
import { CommandBackground } from '../renderer/@types/command-background'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})

const hadles: CommandBackground[] = [];

ipcMain.on('comando-watch-iniciar', (event, json: string) => {
  const data = JSON.parse(json);

  const { id_scope, id_command, command } = data;

  const janela = BrowserWindow.getFocusedWindow();
  if (!janela) return;

  const processoWatch = spawn(command, [], {
    shell: true,
    env: process.env,
  });

  processoWatch.stdout.on('data', (data) => {
    const result = {
      result: data.toString(),
      id_command,
      id_scope
    }
    janela.webContents.send('comando-watch-saida', JSON.stringify(result));
  });

  processoWatch.stderr.on('data', (data) => {
    const result = {
      result: data.toString(),
      id_command,
      id_scope
    }
    janela.webContents.send('comando-watch-saida', JSON.stringify(result));
  });

  processoWatch.on('close', (code) => {
    janela.webContents.send('comando-watch-fim', `{"id_scope": ${id_scope}, "code": ${code}}`);

    // remover da lista
    const index = hadles.findIndex(
      item => item.id_scope === +id_scope && item.id_command === +id_command
    );
    if (index !== -1) {
      hadles.splice(index, 1);
    }
  });

  hadles.push({
    id_scope: +id_scope,
    id_command: +id_command,
    handdle: processoWatch,
  });
});

ipcMain.on('comando-watch-parar', (event, json) => {
  const data = JSON.parse(json);
  const { id_scope, id_command } = data;
  const handle = hadles.find(
    item => item.id_scope === +id_scope && item.id_command === +id_command
  );

  if (handle) {
    console.log(handle);
    handle.handdle.kill();
  }
});

ipcMain.on('reset-all-handles', () => {
  hadles.forEach(item => {
    item.handdle.kill();
  });
});
