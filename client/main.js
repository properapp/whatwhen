Meteor.startup(function(){
  Session.setDefault('timelines_loading', true);
  Session.setDefault('timeline_items_loading', true);
});

Meteor.subscribe("timelines", function(){
  Session.set('timelines_loading', false);   
});

Meteor.subscribe("timelineItems", function(){
  Session.set('timeline_items_loading', false); 
});
