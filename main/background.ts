import path from 'path'
import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import { exec, spawn } from 'child_process'
import { CommandBackground } from '../renderer/@types/command-background'
import fs from 'fs';

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

  let { id_scope, id_command, command, directory } = data;
  let disk = directory.substr(1,1)

  const janela = BrowserWindow.getFocusedWindow();
  if (!janela) return;

  const processoWatch = spawn(`${disk}: && cd ${directory} && ${command}`, [], {
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
    const result = {
      result: code,
      id_command,
      id_scope
    }

    // remover da lista
    const index = hadles.findIndex(
      item => item.id_scope === +id_scope && item.id_command === +id_command
    );

    if (index !== -1) {
      hadles.splice(index, 1);
    }

    janela.webContents.send('comando-watch-fim', JSON.stringify(result));
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

  if (handle.handdle && handle.handdle.pid) {
    exec(`taskkill /pid ${handle.handdle.pid} /T /F`);
  }
});

ipcMain.on('reset-all-handles', () => {
  hadles.forEach(item => {
    item.handdle.kill();
  });
});

ipcMain.handle('selecionar-pasta', async () => {
  const resultado = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });

  return resultado.canceled ? null : resultado.filePaths[0];
});

const pathDir = path.join(app.getPath('appData'), 'TermialHandler');
const dataPath = path.join(pathDir, 'data.json');

if (!fs.existsSync(pathDir)){
  fs.mkdir(pathDir, () => {});
}

ipcMain.on('save-data', (event, data) => {
  fs.writeFileSync(dataPath, data);
});

ipcMain.handle('get-data', () => {
  return fs.readFileSync(dataPath, 'utf-8');
});
