/*
function createWindow () {
  // 创建浏览器窗口
  win = new BrowserWindow({width: 800, height: 600});

  // 然后加载应用的 index.html。
  win.loadFile('index.html');
}

app.on('ready', createWindow);*/

// const {app, BrowserWindow, Menu, Tray} = require('electron');
const path = require('path');
const electron = require('electron')
const ipc = electron.ipcMain
const app = electron.app
const Menu = electron.Menu
const Tray = electron.Tray
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

//用一个 Tray 来表示一个图标,这个图标处于正在运行的系统的通知区 ，通常被添加到一个 context menu 上.
const menu = Menu.Menu;
const tray = Tray.Tray;
//托盘对象
let appTray = null;

function createWindow () {
  // 创建浏览器窗口。
  win = new electron.BrowserWindow({width: 800, height: 600});

  // 然后加载应用的 index.html。
  win.loadFile('index.html');

  // 打开开发者工具
  win.webContents.openDevTools();

  //系统托盘右键菜单
  let trayMenuTemplate = [
    {
      label: '设置',
      click: function () {} //打开相应页面
    },
    {
      label: '帮助',
      click: function () {}
    },
    {
      label: '关于',
      click: function () {}
    },
    {
      label: '退出',
      click: function () {
        app.quit();
        app.quit();//因为程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭的情况
      }
    }
  ];

  //系统托盘图标目录

  appTray = new Tray(path.join(__dirname, 'mmexport1533902357308.jpg'));//app.ico是app目录下的ico文件
  // appTray = new tray("E:\\迅雷下载\\easyicon_201808220410583851\\1081456.png");//app.ico是app目录下的ico文件

  //图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

  //设置此托盘图标的悬停提示内容
  appTray.setToolTip('我的托盘图标');

  //设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);
  //单击右下角小图标显示应用
  appTray.on('click',function(){
    win.show();
  });

  // 当 window 被关闭，这个事件会被触发。
  win.on('close',(e) => {
    //回收BrowserWindow对象
    if(!win.isVisible()){
      win = null;
    }else{
      e.preventDefault();
      win.hide();
    }
  });
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
electron.app.on('ready', createWindow);

// 当全部窗口关闭时退出。
electron.app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    electron.app.quit()
  }
});

electron.app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow()
  }
});
