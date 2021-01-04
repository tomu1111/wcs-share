const { app, BrowserWindow, ipcMain } = require('electron');


const html = '<html><head>'
  + '<title>HTML STRING</title>'
  + '</head><body>'
  + '<h1>HTML STRING</h1>'
  + '<p>This is string content.</p>'
  + '</body></html>';


  function createWindow () {
    let win = new BrowserWindow({
      x: 1000,
      y: 100,
      width: 300,
      height: 1000,
      webPreferences: {
        nodeIntegration: true
      }
    });
    win.loadFile('index2.html')
    
  
    let child = new BrowserWindow({
      width: 1000,
      height: 1000,
      x: 0,
      y: 100,
      parent: win, // ☆
      webPreferences: {
        nodeIntegration: true
      }
    });
    child.loadFile('index3.html')
    win.webContents.openDevTools();
    ipcMain.on('url', async (event, arg) => {
        console.log('receive message: url')
        console.log(arg)
        const currentURL = child.webContents.getURL()
        child.loadURL(currentURL)
        console.log(currentURL)
        await sleep(3)
        event.sender.send('wakuwaku:yyy', { message: 'pong' })
      })
    
    
  }

  
    
  app.whenReady().then(createWindow)