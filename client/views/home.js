Template.home.events({
  
  'click .home-signup-create': function() {
    mixpanel.track("Clicked Landing Page Signup");
  },

  'click .home-final-cta': function() {
    mixpanel.track("Clicked Home Final CTA");
  },

  'click .home-proper': function() {
    mixpanel.track("Clicked Home Proper");
  },

  'click .home-view-example-timeline': function() {
    mixpanel.track("Viewed Example Timeline");
  }
  
});