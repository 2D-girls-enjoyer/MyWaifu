const { spawn, exec } = require('node:child_process');
const { resolve } = require('node:path');

const { cleanString } = require('./utilities.js');

const controller = new AbortController();
const { signal } = controller;
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const viteSuccess_regex = /Local:\s*(http:\/\/localhost:[0-9]{1,5}\/)/;
const EADDRINUSEErr_regex = /EADDRINUSE:\s+address already in use\s+.+:([0-9]{1,5})\n/;
const currentDir = process.cwd();



['SIGINT', 'SIGTERM'].forEach((signal) => {
   process.on(signal, () => {
      console.log(`Received exit signal, exiting...`);
      controller.abort();
      process.exit(0);
   });
});



console.log(`Starting servers...\nCurrent working directory: ${currentDir}`);

const apiServer = spawn(npm, ['run', 'starts'], {
   cwd: resolve(currentDir, './api'),
   signal,
   shell: process.platform === 'win32'
});

const uiServer = spawn(npm, ['run', 'preview'], {
   cwd: resolve(currentDir, './ui'),
   signal,
   shell: process.platform === 'win32'
});

apiServer.stderr.on('data', (data) => {
   data = data.toString();

   if(data.includes('listen EADDRINUSE: address already in use')){
      const port = data.match(EADDRINUSEErr_regex)[1];

      console.error(`API Server Error: Port ${port} already in use. Exiting...`);
      controller.abort();
      return
   }

   console.error(`API Server Error: ${data}`);
});

uiServer.stderr.on('data', (data) => {
   console.error(`UI Server Error: ${data}`);
});

uiServer.stdout.on('data', (data) => {
   data = data.toString();
   process.stdout.write(data);

   // catch success message
   const successMsg = cleanString(data).match(viteSuccess_regex);
   if(successMsg) tellServerStarted(successMsg[1]);
});








function tellServerStarted(url){
   setTimeout(() => { // vite takes some time to print all messages, we'll let it finish
      console.log(`\nServer started successfully.\nvisit: ${url} for User Interface\n[TIP] Press Ctrl+C to stop.`);
   }, 500);

   exec(process.platform === 'win32'
      ? `start "" ${url}`
      : `xdg-open ${url}`
   ); // open browser
}