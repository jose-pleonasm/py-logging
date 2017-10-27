const gulp = require('gulp');

gulp.task('docs', function () {
	const fs = require('fs-then-native');
	const jsdoc2md = require('jsdoc-to-markdown');

	return jsdoc2md.render({ files: [
		'lib/logging.js',
		'lib/Filterer.js',
		'lib/Logger.js',
		'lib/Handler.js',
		'lib/Formatter.js',
		'lib/Filter.js',
		'lib/handlers.js'
	] })
		.then(output => fs.writeFile('API.md', output));
});