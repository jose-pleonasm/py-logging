const packageVer = require('../package.json').version;
const libVer = require('../lib/logging.js').VERSION;

if (packageVer !== libVer) {
	console.warn(`Versions don't match!`
		+ `\n - package.json version: ${packageVer}`
		+ `\n - lib version: ${libVer}`);
	process.exit(1);
}
