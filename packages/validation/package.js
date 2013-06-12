Package.describe({
  summary: "A meteor implementation of the validation plugin for jQuery."
});

Package.on_use(function (api) {
  api.add_files(['validate.js'], 'client');
});