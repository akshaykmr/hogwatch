var menubar = require('menubar');
var exec = require('exec');

var target=process.argv[2] || 'http://localhost:6432';
var port = target.split(':')[2];

console.log(target,port);

var command=['sudo','hogwatch','server',port];
exec(command, function(err, out, code) {
  if (err instanceof Error)
    throw err;
  process.stderr.write(err);
  process.stdout.write(out);
  process.exit(code);
});

var mb = menubar({
	'index': target,
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
var cleanExit = function() { process.exit() };
process.on('SIGINT', cleanExit); // catch ctrl-c