Template.header.helpers({
  notPublicView: function() {
    return  Meteor.Router.page() != "timelinePublic" ? true : false;
  },
  user: function() {
   return Meteor.user();
  }
});