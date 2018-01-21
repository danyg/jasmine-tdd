#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const fork = require('child_process').fork;

const DEFAULT_CONFIG_PATH = path.resolve(process.cwd() + '/spec/support/jasmine.json');
const DEFAULT_WATCHED_EXTENSIONS = '.js,.spec.js,.ts,.spec.ts';

program
	.option('-c, --config-file [path]', `Path to Jasmine config file. default: ${DEFAULT_CONFIG_PATH}`, DEFAULT_CONFIG_PATH)
	.option('-n, --no-watch', 'Just execute test once')
	.option('-e, --extensions [extensions]', `Watched file extensions separated by comas. default ${DEFAULT_WATCHED_EXTENSIONS}`,  DEFAULT_WATCHED_EXTENSIONS)
	.parse(process.argv)
;

function executeJasmine() {
	console.log();
	console.log('Executing Jasmine');
	console.log();

	fork(__dirname + '/jasmine.js', [
		'--config-file',
		program.configFile
	]);
}

executeJasmine();

if(!program.noWatch) {
	
	const extensions = new RegExp('^.*' + program.extensions
		.split(',')
		.map(i => i.replace('.', '\\.').trim())
		.join('$|^.*') +
		'$'
	);
	let timer; 
	
	const watcher = fs.watch(process.cwd(), {
		recursive: true,
		persistent: true
	}, (eventType, file) => {
		console.log('FS WATCHER: ', eventType, file);
		if(extensions.test(file)) {
			clearTimeout(timer);
			timer = setTimeout(executeJasmine, 100);
		}
	});

	const closeWatcher = () => {
		try {
			watcher.close();
		} catch (e) {}
		try {
			process.exit();
		} catch (ee) {}
	};
	process.on('exit', closeWatcher);
	process.on('disconnect', closeWatcher);
	process.on('SIGINT', closeWatcher);
	process.on('SIGTERM', closeWatcher);
	process.on('SIGHUP', closeWatcher);
	process.on('message', (m) => {console.log('message>', m)});
	process.stdin.resume();
	process.stdin.on('data', closeWatcher);
}
