Template.accountSettings.helpers({
  
  emailAddress: function() {
    var currentUser = Meteor.userId();
    var query = Meteor.users.findOne({_id: currentUser}, {fields: {"emails.address": 1}});
    var email = query.emails[0].address;
    return email; 
  }
  
});

Template.accountSettings.rendered = function() {

  var profileForm  = this.find("#settings-profile");
  var passwordForm = this.find("#settings-password");
    
  $(profileForm).validate({
    rules: {
      settingsFirstName: {
        required: true,
        onlyLetters: true
      },
      settingsLastName: {
        required: true,
        onlyLetters: true        
      },
      settingsEmailAddress: {
        required: true,
        email: true,
        currentUser: true
      },
      settingsPassword: {
        required: true,
        minlength: 6
      },
      settingsLanguage: {
        required: true,
        valueNotEquals: "Select a language..."
      }
    },
    messages: {
      settingsFirstName: {
        required: "Need a name here.",
        onlyLetters: "Is this legit?"
      },
      settingsLastName: {
        required: "Need a name here.",
        onlyLetters: "Is this legit?"
      },
      settingsEmailAddress: {
        required: "An email address would be helpful. Pop one in.",
        email: "That doesn't look like an email address. Try again?"        
      },
      settingsPassword: {
        required: "Need a pasword, buddy.",
        minlength: "Use at least six (6) characters."
      },
      settingsLanguage: {
        required: "Select a language. For your health.",
        valueNotEquals: "Select a language. For your health."
      }
    },
    submitHandler: function() {
      
      var currentUser = Meteor.userId();
      
      var updatedUser = {
        firstName: $("#settings-profile").find(".settingsFirstName").val(),
        lastName: $("#settings-profile").find(".settingsLastName").val(),
        email: $("#settings-profile").find(".settingsEmail").val(),
        language: $("#settings-profile").find(".settingsLanguage").val()
      }

      Meteor.users.update({_id: currentUser}, 
      {$set:{ 
        "emails.0.address": updatedUser.email,
        "profile.firstName": updatedUser.firstName,
        "profile.lastName": updatedUser.lastName,
        "profile.language": updatedUser.language
      }
      }, function(error){
        
        if (error) {
        
          $("#settings-profile").hide();
          $(".profile-update-failed").fadeIn(function(){
            setTimeout(function(){
              $(".profile-update-failed").hide();
              $("#settings-profile").fadeIn();
            }, 2500);
          });
          
        } else {
          
          $("#settings-profile").hide();
          $(".profile-updated").fadeIn(function(){
            setTimeout(function(){
              $(".profile-updated").hide();
              $("#settings-profile").fadeIn();
            }, 2500);
          });
        
        }
        
      });
      
    }
      
  });

  $(passwordForm).validate({
    rules: {
      newPassword: {
        required: true,
        minlength: 6
      }
    },
    messages: {
      currentPassword: {
        required: "Need your current password.",
        minlength: "This should be at least six (6) characters."
      },
      newPassword: {
        required: "Need a new pasword, buddy.",
        minlength: "Use at least six (6) characters."
      }
    },
    submitHandler: function() {

      var currentPassword = $("#settings-password").find(".currentPassword").val();
      var newPassword     = $("#settings-password").find(".newPassword").val();
      
      Accounts.changePassword(currentPassword, newPassword, function(error){

        if (error) {
        
          Meteor.setTimeout(function(){
            
            $("#settings-password").find(".currentPassword").val("");
            $("#settings-password").find(".newPassword").val("");
          
            $("#settings-password").fadeOut(function(){
              
              $(".password-failed").fadeIn();
              
              Meteor.setTimeout(function(){
                $(".password-failed").hide();
                $("#settings-password").fadeIn();
              }, 3000);
              
            });
            
          }, 100);
          
        } else {
          console.log("Success!");
          
          Meteor.setTimeout(function(){
            
            $("#settings-password").find(".currentPassword").val("");
            $("#settings-password").find(".newPassword").val("");
          
            $("#settings-password").fadeOut(function(){
              
              $(".password-updated").fadeIn();
              
              Meteor.setTimeout(function(){
                $(".password-updated").hide();
                $("#settings-password").fadeIn();
              }, 3000);
              
            });
            
          }, 100);
          
        }
                    
      });

    }
      
  });
  
  var getUser  = Meteor.user();
  var getLang  = getUser.profile.language;
  
  var langType = $("#settings-profile").find(".settingsLanguage").val(getLang);
  
  $("#settings-profile").find("select option[value='"+getLang+"']").attr("selected", "selected"); 

    
}

Template.accountSettings.events({
  
  'submit #settings-profile': function(e) {
    e.preventDefault();
  },

  'submit #settings-password': function(e) {
    e.preventDefault();
  },
  
  'click .page-action': function(e) {
    
    var confirmDelete = confirm("Are you sure? This will send your account into the ether, timelines and all. Only do this if you hate WhatWhen...but hopefully you don't hate WhatWhen. Only if you're certain, go for it.");
    
    var currentUser   = Meteor.userId();
    var getUser       = Meteor.users.findOne({_id: currentUser});
    var getEmail      = getUser.emails[0].address;
    var getName       = getUser.profile.firstName;
    
    if (confirmDelete) {
      
      Meteor.call("deleteUser", currentUser, getEmail, getName, function(error){
        Meteor.setTimeout(function(){
        
          Meteor.users.remove({_id: currentUser}, function(){
            Meteor.Router.to("/");
          }); 
                
        }, 1000);                     
      });   
      
    }
    
  }
  
});