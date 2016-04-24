var menubar = require('menubar');

console.log(process.argv)
var mb = menubar({
	'index': process.argv[2] || 'http://localhost:6432',
	'preload-window': true
});

mb.on('ready', function ready () {
  console.log('app is ready');
});


if(process.argv[3]==='debug'){
	mb.on('after-create-window', function(){
	mb.window.openDevTools();
});
}