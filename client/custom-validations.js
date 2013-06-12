if(Meteor.isClient) { Meteor.subscribe('allUsers'); }

/* Unique Email Validator on Account Updates */

$.validator.addMethod("currentUser", function(value, element) { 

  var currentUser  = Meteor.userId();
  var getUser      = Meteor.users.findOne({_id: currentUser}, {fields: {"emails.address": 1}});
  var currentEmail = getUser.emails[0].address;

  if ( value == currentEmail ) {
    return true;
  } else {
    var findEmail = Meteor.users.findOne({'emails.address': {$regex: value} }),
        isUnique = findEmail ? false : true; 
    return isUnique;     
  } 
  
}, "A user with this email already exists.");

/* Unique Email Validator */

$.validator.addMethod("unique", function(value, element) { 

  var findEmail = Meteor.users.findOne({'emails.address': {$regex: value} }),
       isUnique = findEmail ? false : true; 
  
  return isUnique; 
  
}, "This account already exists. Try another address.");

/* Type Selection on Adding Timeline Items */

$.validator.addMethod("valueNotEquals", function(value, element, arg){
return arg != value;
}, "Select a type.");

/* Only Letters & Characters on Names */

$.validator.addMethod("onlyLetters", function(value, element) { 
  
  onlyLetters = /^[a-zA-Z\- ÅåÄäÖöØøÆæÉéÈèÜüÊêÛûÎî]*$/.test(value);

  return onlyLetters; 
  
}, "A real name, please.");


/* Account Existence */

$.validator.addMethod("accountExists", function(value, element) { 

  var findEmail = Meteor.users.findOne({'emails.address': {$regex: value} }),
         exists = findEmail ? true : false; 
  
  return exists; 
  
}, "");