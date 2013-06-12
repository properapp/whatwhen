Meteor.Router.add({

  '/': {
    to: 'home',
    and: function() {
      Session.set("activeLink", Meteor.Router.page()); 
      $('html,body').scrollTop(0);
    }
  },
  
  '/help': {
    to: 'help',
    and: function() { 
      Session.set("activeLink", Meteor.Router.page()); 
      $('html,body').scrollTop(0);
    }
  },
  
  '/signup': {
    to: 'signup',
    and: function() { 
      Session.set("activeLink", Meteor.Router.page()); 
      $('html,body').scrollTop(0);
    }
  },
  
  '/login': {
    to: 'login',
    and: function() { 
      Session.set("activeLink", Meteor.Router.page()); 
      $('html,body').scrollTop(0);
    }
  },
  
  '/reset': {
    to: 'passwordReset',
    and: function() {
      $('html,body').scrollTop(0);
    }
  },
  
  '/password-reset/:token': {
    to: 'passwordResetForm',
    and: function(token) {
      Session.set("passwordResetToken", token);
      $('html,body').scrollTop(0);
    }
  },
  
  '/settings': { 
    
    as: 'settings', 
    to: function(){
      Session.set("activeLink", "settings");
      $('html,body').scrollTop(0);
      if (Meteor.user()) {
        return 'accountSettings'
      } 
    }
  
  },
  
  '/timelines': {
    to: 'timelinesList',
    and: function() { 
      Session.set("activeLink", Meteor.Router.page()); 
      $('html,body').scrollTop(0);
    }
  },
    
  '/timelines/:_id': { as: 'timelineEditor', to: function(id) {
  
    var loadingTimeline = Session.get("timelines_loading");
    var loadingItems    = Session.get("timeline_items_loading");    
    var query = Timelines.findOne({_id: id});
    
    if (loadingTimeline || loadingItems) {
      return 'loading'
    } else if (query) {
      Session.set("currentTimeline", id);
      Session.set("activeLink", Meteor.Router.page()); 
      return 'timelineEditor';
    } else {
      return 'timelineNotFound';
    }

  }},

  '/timelines/:_id/view': { as: 'timelinePublic', to: function(id) {
    
    $('html,body').scrollTop(0);
    
    var loadingTimeline = Session.get("timelines_loading");
    var loadingItems    = Session.get("timeline_items_loading");
    
    var query = Timelines.findOne({_id: id});
    
    if (loadingTimeline || loadingItems) {
      return 'loading'
    } else if (query) {
      Session.set("currentTimeline", id);
      Session.set("activeLink", Meteor.Router.page()); 
      return 'timelinePublic';
    } else {
      return 'timelineNotFound';
    }

  }},  
  
  '/terms': {
    to: 'terms',
    and: function() {
      Session.set("activeLink", Meteor.Router.page()); 
      $('html,body').scrollTop(0);
    }  
  },
  
  '/donate': {
    to: 'donate',
    and: function() { 
      Session.set("activeLink", Meteor.Router.page()); 
      $('html,body').scrollTop(0);
    }
  },

  '/*': {
    to: '404',
    and: function() {
      $('html,body').scrollTop(0);
    }
  }
  
});

Meteor.Router.filters({
  
  // Limit Access for Logged Out Users
  
  'loggedIn': function(page) {
    
    if (Meteor.user()) {
      return page;
    } else if (Meteor.loggingIn()) {
      return 'loading';
    } else {
      return 'login';
    }
      
  }, 
  
  'currentUser': function(page) {
    
    if (Meteor.user()) {
      Meteor.Router.to("/timelines");
      Session.set("activeLink", 'timelinesList');
      return 'timelinesList'
    } else {
      return page;
    }
    
  }
  
});

Meteor.Router.filter('loggedIn', {only: ['timelinesList', 'timelineEditor']});
Meteor.Router.filter('currentUser', {only: ['home', 'login', 'signup']});