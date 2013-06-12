timelineItems = new Meteor.Collection("timelineItems");

timelineItems.allow({
  insert: function(userId, doc) {
    return userId == doc.owner;
  },
  update: function(userId, doc) {
    return userId == doc.owner;
  },
  remove: function(userId, doc) {
    return userId == doc.owner;
  }
});

timelineItems.deny({
  insert: function(userId, doc) {
    return (!userId || userId != doc.owner);
  },
  update: function(userId, doc) {
    return (!userId || userId != doc.owner);
  },
  remove: function(userId, doc) {
    return (!userId || userId != doc.owner);
  }
});