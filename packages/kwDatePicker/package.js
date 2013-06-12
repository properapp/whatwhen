Package.describe({
  summary: "A meteor implementation of Keith Wood's datepicker plugin for jQuery."
});

Package.on_use(function (api) {
  api.add_files([
    'datepick.min.js', 
    'datepick.css',
    'ui.datepick.css',
    'ui-smoothness.datepick.css',
    'languages/jquery.datepick-de.js',
    'languages/jquery.datepick-en-AU.js',
    'languages/jquery.datepick-en-GB.js',
    'languages/jquery.datepick-en-NZ.js',
    'languages/jquery.datepick-es.js',
    'languages/jquery.datepick-fr.js',
    'languages/jquery.datepick-it.js',
    'languages/jquery.datepick-ja.js',
    'languages/jquery.datepick-nl.js',
    'languages/jquery.datepick-pt.js',
    'languages/jquery.datepick-ru.js',
    'languages/jquery.datepick-sv.js',
    'languages/jquery.datepick-zh-CN.js',
    'languages/jquery.datepick-zh-TW.js'
  ], 'client');
});