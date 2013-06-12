/* Account Collections */

Meteor.publish("timelines", function(){
  return Timelines.find();
  this.ready();
});

Meteor.publish("timelineItems", function(){
  return timelineItems.find();
  this.ready();
});

Meteor.publish("allUsers", function(){
  return Meteor.users.find();
  this.ready();
});