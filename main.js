
const { app, BrowserWindow, ipcMain } = require("electron");
require('electron-reload')(__dirname);
const readItem = require("./readItem");
//import { from } from 'rxjs';
const url = require("url");
const path = require("path");

const windowStateKeeper = require("electron-window-state");
let mainWindow;

ipcMain.on('to-main',(e,args) => {
  let url = args;
  console.log('in on-main',url, typeof(url));

  // let win = new BrowserWindow({ width: 800, height: 1500 })
  // win.loadURL(url);

  // let contents = win.webContents
  // console.log('contents:',contents)

    offScreenWindow = new BrowserWindow({
      width:500,
      height:500,
      show:false,
      webPreferences:{
        offscreen:true,
        nodeIntegration:false
      }
    })

    offScreenWindow.loadURL(url)


    offScreenWindow.webContents.on('did-finish-load', (event) => {
       var title = offScreenWindow.getTitle()
        console.log('title is:',title);
        if (e.hasOwnProperty('sender')) {
          e.sender.send('to-renderer',title)
          // offScreenWindow.webContents.capturePage(image => {
          //   let screenShot = image.toDataURL()
          //   console.log('image ad screeshot: ', image,screenShot);
          //   offScreenWindow.webContents.send('to-renderer',{title,screenShot,url})
          //   offScreenWindow.close()
          //   offScreenWindow=null;
          // })
        } else {
          console.log('e.sender not available:', e);
        }
    })

  //e.sender.send('to-renderer', 'Welcome to new window')
})
//console.log(url);


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

  // mainWindow.webContents.on('did-finish-load', e => {
  //   let title = mainWindow.getTitle()
  // console.log('title is:',title);
  // })

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
