Template.timelinePublic.helpers({
  loadingItems: function() {
    return Session.get("timeline_items_loading");
  },
  timeline: function() {
   var currentTimeline = Session.get("currentTimeline");
   return Timelines.findOne(currentTimeline);
  },
  timelineItems: function() {
   var currentTimeline = Session.get("currentTimeline");
   return timelineItems.find({timeline: currentTimeline}, {sort: { date: 1, time: 1}});
  },
  timelineHasItems: function() {
   var currentTimeline = Session.get("currentTimeline");
   var query = timelineItems.find({timeline: currentTimeline});
   return query.count() > 0 ? true : false;
  }
});