Package.describe({
  summary: "Mixpanel analytics for WhatWhen."
});

Package.on_use(function (api) {
  api.add_files(['mixpanel.js'], 'client');
});