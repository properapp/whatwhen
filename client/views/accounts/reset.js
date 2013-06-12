Template.passwordReset.rendered = function() {
  
  var resetForm = this.find("form");
  
  $(resetForm).validate({
    rules: {
      emailAddress: {
        accountExists: true,
        email: true,
        required: true
      }
    },
    messages: {
      emailAddress: {
        accountExists: "This account does not exist.",
        required: "",
        email: ""        
      }
    },
    submitHandler: function() {
    
      var email = $("#reset-password").find("[name='emailAddress']").val();
      
      Accounts.forgotPassword({email: email}, function(error){
        
        if (error) { 
          console.log(error.reason); 
        } else {
          $("#reset-password").hide();
          $(".reset-sent").fadeIn();
        }
        
      });
      
    }
      
  });
  
}

Template.passwordReset.events({
  
  'submit form': function(e) {
    e.preventDefault();
  }
  
});

Template.passwordResetForm.rendered = function() {
  
  var passwordForm = this.find("form");
  
  $(passwordForm).validate({
    rules: {
      newPassword: {
        minlength: 6,
        required: true
      }
    },
    messages: {
      newPassword: {
        required: "You can't reset nothing, dude. Pop a password in here.",
        minlength: "Use at least six (6) characters."        
      }
    },
    submitHandler: function() {
    
      var  resetToken = Session.get("passwordResetToken");
      var newPassword = $("#password-reset").find(".new-password").val();
      
      Accounts.resetPassword(resetToken, newPassword, function(error){
        
        if (error) {
          alert(error.reason);
        } else {
          Meteor.Router.to("/login");
        }
        
      });
      
    }
      
  });
  
}

Template.passwordResetForm.events({
  
  'submit form': function(e, t) {
    
    e.preventDefault();
    
  }
  
});