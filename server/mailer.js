Meteor.methods({
  
  signupEmail: function(recipient) {
    
    var recipientEmail = recipient.email;
    var recipientName  = recipient.profile.firstName;

    Email.send({
      to: recipientEmail,
      from: "",
      subject: "[WhatWhen] Hey, " + recipientName + "! Welcome to WhatWhen.",
      html: Handlebars.templates.signup({
        recipientName: recipientName
      })
    }); 
            
  },
  
  sendTimelineEmail: function(recipients, senderName, projectName, timelineUrl) {
    
    var recipientsList = recipients;
     
    for (var i = 0; i < recipientsList.length; i++) {
      
      var recipient = recipientsList[i];

      Email.send({
        to: recipient.email,
        from:  senderName + "",
        subject: "[WhatWhen] " + senderName + " has sent you a timeline!",
        html: Handlebars.templates.sendtimeline({
          recipientName: recipient.firstName,
          senderName: senderName,
          projectName: projectName,
          timelineLink: timelineUrl
        })
      });
        
    }
    
  }
  
});