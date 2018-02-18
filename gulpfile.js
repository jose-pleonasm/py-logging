const gulp = require('gulp');

gulp.task('docs', function () {
	const fs = require('fs-then-native');
	const jsdoc2md = require('jsdoc-to-markdown');

	return jsdoc2md.render({ files: [
		'core/logging.js',
		'core/Filterer.js',
		'core/Logger.js',
		'core/Handler.js',
		'core/Formatter.js',
		'core/Filter.js',
		'core/Manager.js',
		'core/handlers.js',
		'commonkit/index.js',
		'nodekit/index.js'
	] })
		.then(output => fs.writeFile('API.md', output));
});