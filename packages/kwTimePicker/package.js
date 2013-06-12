Package.describe({
  summary: "A meteor implementation of Keith Wood's timepicker plugin for jQuery."
});

Package.on_use(function (api) {
  api.add_files([
    'timeentry.min.js', 
    'languages/jquery.timeentry-de.js',
    'languages/jquery.timeentry-es.js',
    'languages/jquery.timeentry-fr.js',
    'languages/jquery.timeentry-it.js',
    'languages/jquery.timeentry-ja.js',
    'languages/jquery.timeentry-nl.js',
    'languages/jquery.timeentry-pt.js',
    'languages/jquery.timeentry-ru.js',
    'languages/jquery.timeentry-sv.js',
    'languages/jquery.timeentry-zh-CN.js',
    'languages/jquery.timeentry-zh-TW.js'
  ], 'client');
});