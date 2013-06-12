Template.timelineEditor.helpers({
  loadingItems: function() {
    return Session.get("timeline_items_loading");
  },
  notPublicView: function() {
    return  Meteor.Router.page() != "timelinePublic" ? true : false;
  }  
});

Template.timelineStartFinish.helpers({
  timeline: function() {
    var currentTimeline = Session.get("currentTimeline");
    return Timelines.findOne({_id: currentTimeline}, {fields: {"startDate": 1, "finishDate": 1}}); 
  }
});

Template.timelineStartFinish.rendered = function() {

  $(".datepicker-start").datepick({
    showAnim: "fadeIn",
    onSelect: function(dates) {  
      var currentTimeline = Session.get("currentTimeline");
      var datePicked = dates[0];
      var formatted  = $.datepick.formatDate(datePicked);
      Timelines.update(currentTimeline, {$set: {"startDate": formatted}});
    }   
  });
  
  $(".datepicker-finish").datepick({
    showAnim: "fadeIn",
    onSelect: function(dates) {  
      var currentTimeline = Session.get("currentTimeline");
      var datePicked = dates[0];
      var formatted  = $.datepick.formatDate(datePicked);
      Timelines.update(currentTimeline, {$set: {"finishDate": formatted}});
    }   
  });
}
