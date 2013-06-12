Template.account.events({
  
  'click .logout-link': function(e) {
    e.preventDefault();
    Meteor.logout(function(){
      Meteor.Router.to(Meteor.Router.homePath());
      mixpanel.track("Logged Out");
    });
  },
  
  '.click .signup-link': function(e) {
     mixpanel.track("Clicked Header Signup");
  },

  '.click .login-link': function(e) {
     mixpanel.track("Clicked Header Login");
  }
  
});