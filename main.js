
const { app, BrowserWindow, ipcMain } = require("electron");
require('electron-reload')(__dirname);
const readItem = require("./readItem");
//import { from } from 'rxjs';
const url = require("url");
const path = require("path");

const windowStateKeeper = require("electron-window-state");
let mainWindow;

//Listen for url coming from Renderer
ipcMain.on('url-to-main',(e,itemUrl) => {
  //console.log('url from renderer',itemUrl);
  readItem(itemUrl,item => {
    console.log('item from readItem',item)

    //e.sender.send('from-main-to-renderer',item)
  })
})

function createWindow() {
  // Win state keeper
  let state = windowStateKeeper({
    defaultWidth: 500,
    defaultHeight: 650
  });
  mainWindow = new BrowserWindow({
    x: state.x,
    y: state.y,
    width: state.width,
    height: state.height,
    minWidth: 350,
    maxWidth: 650,
    minHeight: 300,
    webPreferences: {
      nodeIntegration: true
    }
  });

  console.log('mainWindow', mainWindow);

  state.manage(mainWindow);

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
  if (mainWindow === null) createWindow();
});
