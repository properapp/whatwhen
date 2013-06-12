Accounts.config({
  forbidClientAccountCreation: true
});

Meteor.users.allow({
  update: function(user, doc) {
    return (user == doc._id);
  },
  remove: function(user, doc) {
    return (user == doc._id);
  }
});