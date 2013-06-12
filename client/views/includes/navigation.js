Template.navigation.helpers({
  userExists: function() {
    return Meteor.user();
  }  
});

Handlebars.registerHelper("activeLink", function (nav) {
  return Session.equals("activeLink", nav) ? "active" : "";
});

Handlebars.registerHelper("isHome", function (nav) {
  return Meteor.Router.page() == "home" ? true : false;
});

Handlebars.registerHelper("isNotPublic", function (nav) {
  return Meteor.Router.page() == "timelinePublic" ? false : true;
});