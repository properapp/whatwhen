Template.signup.rendered = function() {
  
  var signupForm = this.find("form");
  
  $(signupForm).validate({
    rules: {
      firstName: {
        onlyLetters: true
      },
      lastName: {
        onlyLetters: true        
      },
      emailAddress: {
        required: true,
        email: true,
        unique: true
      },
      password: {
        required: true,
        minlength: 6
      },
      language: {
        required: true,
        valueNotEquals: "Select a language..."
      }
    },
    messages: {
      firstName: {
        required: "Need a name here.",
        onlyLetters: "Is this legit?"
      },
      lastName: {
        required: "Need a name here.",
        onlyLetters: "Is this legit?"
      },
      emailAddress: {
        required: "An email address would be helpful. Pop one in.",
        email: "That doesn't look like an email address. Try again?"        
      },
      password: {
        required: "Need a pasword, buddy.",
        minlength: "Use at least six (6) characters."
      },
      language: {
        required: "Select a language. For your health.",
        valueNotEquals: "Select a language. For your health."
      }
    },
    submitHandler: function() {
      
      // Disable Form Temporarily
      
      $("#signup").find("input, button[type='submit']").attr("disabled", "disabled");
      $("#signup").css({opacity: 0.5});
      
      var accountData = {
        profile: { 
          firstName: $("#signup").find("[name='firstName']").val(),
          lastName: $("#signup").find("[name='lastName']").val(),
          language: $("#signup").find("[name='language']").val()
        },
        email: $("#signup").find("[name='emailAddress']").val(),
        password: $("#signup").find("[name='password']").val()
      }  
      
      Meteor.call("signupUser", accountData, function(){
        
        Meteor.call("signupEmail", accountData);
        
        Meteor.setTimeout(function(){
          Meteor.loginWithPassword(accountData.email, accountData.password, function(){
            Meteor.Router.to("/timelines");
            
            mixpanel.track("Created Account");
            mixpanel.people.set({
                "$email": Meteor.user().emails[0].address, 
                "accountId": Meteor.userId(),
                "name": Meteor.user().profile.firstName + " " + Meteor.user().profile.lastName,
                "$created": new Date()
            });
            mixpanel.identify(Meteor.userId());
            Session.set("langPref", accountData.profile.language);
          });
        }, 500);
        
      });      
      
    }
      
  });
  
}

Template.signup.events({
  
  'submit form': function(e) {
    
    e.preventDefault();
    mixpanel.track("Clicked Signup Form Submit");
    
  }

});