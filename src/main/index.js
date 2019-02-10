const path = require('path');
const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;
const Tray = electron.Tray;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

//用一个 Tray 来表示一个图标,这个图标处于正在运行的系统的通知区 ，通常被添加到一个 context menu 上.
const menu = Menu.Menu;
const tray = Tray.Tray;
//托盘对象
let appTray = null;
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`;

function createWindow () {
  /**
   * Initial window options
   */
  win = new electron.BrowserWindow({width: 800, height: 550, frame: false, minWidth: 755, icon: path.join(__static, 'icon.ico')});

  win.loadURL(winURL);


  // 打开开发者工具
  if(process.env.NODE_ENV === 'development')
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
  appTray = new Tray(path.join(__static, 'icon_min.ico'));//app.ico是app目录下的ico文件

  //图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

  //设置此托盘图标的悬停提示内容
  appTray.setToolTip('网易云音乐');

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

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

require('./node/app');

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
