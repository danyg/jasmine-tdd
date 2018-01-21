jasmine-tdd
===========

A cli helper to watch your unit tests and get growl notifications

## Prerequisites
- A jasmine configured project
- growl installed

	### jasmine
	Your project must use jasmine, check [npm jasmine](https://www.npmjs.com/package/jasmine) check there for initialisation.

	### growl
		Check this page for instruction to make growl work with node [https://github.com/tj/node-growl](https://github.com/tj/node-growl)

		If you are using windows check this out: [growlnotify](http://www.growlforwindows.com/gfw/help/growlnotify.aspx) is necessary for jasmine-growl-reporter to work.

## How to use it
``` npm install --save-dev jasmine-tdd ```
add the tdd script to your package.json scripts list, like this:
```json
{
	...
	"scripts": [
		...
		"tdd": "jasmine-tdd"
		...
	]
    ...
}
```
Then execute ```npm run tdd``` and that's it. It will keep watching your tests files and code and it will raise a growl notification with the result.
