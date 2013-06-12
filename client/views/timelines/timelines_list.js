Template.timelinesList.helpers({
  loadingTimelines: function() {
    return Session.get("timelines_loading");
  },  
  hasTimelines: function() {
    var         userId = Meteor.userId(),
                 query = Timelines.find({owner: userId}, {reactive: false}),
                 count = query.count();    
                 
    return count > 0 ? true : false; 
  },
  
  timelines: function() {
    var userId = Meteor.userId();
    return Timelines.find({owner: userId}, {reactive: false});
  }
    
});

Template.timelinesList.events({
  
  'click .page-action': function(e, t) {

    e.preventDefault();
        
    var user  = Meteor.userId();
    var query = Timelines.find({owner: user});
    
    if (query.count() >= 5) {
      alert("Whomp. WhatWhen is a lightweight and can only hold up to five timelines. If you'd like to add more, pick out a timeline you don't need and give it the axe. Sorry, dude.");
    } else {
    
      var blankTimeline = {
        name: "New Timeline",
        created: new Date().getTime(),
        updated: new Date().getTime(),
        owner: Meteor.userId()
      }
      
      Timelines.insert(blankTimeline, function(error, id){
        
        if (error) {
          console.log(error.reason);
        } else {
          Meteor.Router.to("/timelines/" + id);    
          mixpanel.track("Created a Timeline");
        } // end if (error)
        
      });       
      
    }
    
  }
  
});