Meteor.startup(function(){
  
  // Mixpanel Init
  mixpanel.init("");
              
  // Default Language Preferences
  
  var preference = Meteor.users.findOne({_id: Meteor.userId()}, {fields: {"profile.language": 1}});
  
  if (preference) {
  
    var setLanguage  = Session.set("langPref", preference.profile.language);
    var dateLanguage = Session.get("langPref");
    var timeLanguage = Session.get("langPref"); // Messy, but helps to differentiate time.
    
    // Check if Dates are US
    if (dateLanguage == "en-usa") {
      $.datepick.setDefaults($.datepick.regional['']);        
    } else {
      $.datepick.setDefaults($.datepick.regional[dateLanguage]);
    }
    
    // Check if Times are English Based
    
    if ( (timeLanguage == "en-usa") || (timeLanguage == "en-AU") || (timeLanguage == "en-GB") || (timeLanguage == "en-NZ") ) {
      $.timeEntry.setDefaults($.timeEntry.regional['']);
    } else {
      $.timeEntry.setDefaults($.timeEntry.regional[timeLanguage]);
    }
    
  } else {
    $.datepick.setDefaults($.datepick.regional['']);
    $.timeEntry.setDefaults($.timeEntry.regional['']);
  }
    
});

Deps.autorun(function(){
  
  var preference = Meteor.users.findOne({_id: Meteor.userId()}, {fields: {"profile.language": 1}});
  
  if (preference) {
  
    var setLanguage  = Session.set("langPref", preference.profile.language);
    var dateLanguage = Session.get("langPref");
    var timeLanguage = Session.get("langPref"); // Messy, but helps to differentiate time.
    
    // Check if Dates are US
    if (dateLanguage == "en-usa") {
      $.datepick.setDefaults($.datepick.regional['']);        
    } else {
      $.datepick.setDefaults($.datepick.regional[dateLanguage]);
    }
    
    // Check if Times are English Based
    
    if ( (timeLanguage == "en-usa") || (timeLanguage == "en-AU") || (timeLanguage == "en-GB") || (timeLanguage == "en-NZ") ) {
      $.timeEntry.setDefaults($.timeEntry.regional['']);
    } else {
      $.timeEntry.setDefaults($.timeEntry.regional[timeLanguage]);
    }
    
  } else {
    $.datepick.setDefaults($.datepick.regional['']);
    $.timeEntry.setDefaults($.timeEntry.regional['']);
  }
    
    
});