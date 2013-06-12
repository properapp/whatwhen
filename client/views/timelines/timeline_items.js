Template.timelineItems.helpers({
  
  notBlank: function() {
    
    var currentTimeline = Session.get("currentTimeline");
    var query = timelineItems.find({timeline: currentTimeline});

    count = query.count();    
                 
    return count > 0 ? query : false;
    
  },
  
  timelineItem: function() {
      
    var currentTimeline = Session.get("currentTimeline");
    var query = timelineItems.find({timeline: currentTimeline}, {sort: { date: 1, time: 1}});

    count = query.count();
                 
    return count > 0 ? query : false;
    
  },
    
  notPublicView: function() {
    return  Meteor.Router.page() != "timelinePublic" ? true : false;
  }
  
});
