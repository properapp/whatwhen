Meteor.methods({

  signupUser: function(accountData) {
    Accounts.createUser(accountData);
  }
  
});