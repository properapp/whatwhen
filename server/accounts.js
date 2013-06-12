Accounts.emailTemplates.siteName = "WhatWhen";
Accounts.emailTemplates.from = "";

Accounts.emailTemplates.resetPassword.subject = function (user) {
    return "[WhatWhen] Password Reset";
};
Accounts.emailTemplates.resetPassword.text = function (user, url) {
   
   var token = url.substring(url.lastIndexOf('/') + 1);
   
   return "Hi " + user.profile.firstName + ",\n\n" 
        + "A password reset has been requested for this account. To reset the password, visit the following link:\n\n" 
        + "http://localhost:3000/password-reset/" + token + "\n\n" 
        + "If you did not request this reset, please ignore this email. If you feel something is wrong, please contact support: support@whatwhenapp.com.";
};


Meteor.methods({
  
  changeUserPassword: function(userId, newPassword) {
      
    Accounts.setPassword(userId, newPassword);
      
  },
  
  deleteUser: function(userId, recipientEmail, recipientName) {
    
    Timelines.remove({owner: userId});
    timelineItems.remove({owner: userId});
    mixpanel.track("Deleted Account");
    
    Email.send({
      to: recipientEmail,
      from: "",
      subject: "[WhatWhen] :( Sad to see you go, " + recipientName + ".",
      html: Handlebars.templates.deleteaccount({
        recipientName: recipientName
      })
    }); 
    
  }
  
});