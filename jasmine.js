const path = require('path');
const Jasmine = require('jasmine');
const GrowlReporter = require('jasmine-growl-reporter');
const program = require('commander');

const DEFAULT_CONFIG_PATH = path.resolve(process.cwd() + '/spec/support/jasmine.json');
program
	.option('-c, --config-file [path]', `Path to Jasmine config file. default: ${DEFAULT_CONFIG_PATH}`, DEFAULT_CONFIG_PATH)
	.parse(process.argv)
;

const jasmine = new Jasmine();
const growlReporter = new GrowlReporter();

console.log('with config file: ', program.configFile);

jasmine.loadConfigFile(program.configFile);
jasmine.onComplete(function(passed) {
	console.log('Press enter to exit, Ctrl-R to create separations. (Ctrl-C won\'t work)');
});
jasmine.addReporter(growlReporter);
jasmine.execute();