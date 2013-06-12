Timelines = new Meteor.Collection("timelines");

Timelines.allow({
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

Timelines.deny({
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