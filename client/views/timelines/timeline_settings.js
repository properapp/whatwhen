Template.timelineSettings.helpers({
  timeline: function() {
    var currentTimeline = Session.get("currentTimeline");
    return Timelines.findOne(currentTimeline);
  }
});

Template.timelineSettings.events({

  'blur .timeline-name': function(e) {
    var currentTimeline = Session.get("currentTimeline");
    var timelineName = $(e.target).val();
    Timelines.update(currentTimeline, {$set: {name: timelineName}});      
  },

  'blur .timeline-for': function(e) {
    var currentTimeline = Session.get("currentTimeline");
    var timelineFor = $(e.target).val();
    Timelines.update(currentTimeline, {$set: {for: timelineFor}});
  },
  
  'click .email-timeline': function(e) {
    e.preventDefault();
    Session.set("showModal", true);
  },
  
  'click .delete': function(e) {
    
    e.preventDefault();
    
    remove_item = function(arr,value){
    
      for(b in arr ){
          if(arr[b] == value){
              arr.splice(b,1);
              break;
          }
      }

      return arr;
    
    }

    var thisTimeline  = Session.get("currentTimeline");
    var confirmDelete = confirm("Are you sure? This will delete the timeline and all of its items. Be double sure you want to do this!");
    
    if (confirmDelete) {
    
      Timelines.remove(thisTimeline);
      Meteor.Router.to("/timelines");
      mixpanel.track("Deleted a Timeline");

    }
    
  }
    
});
