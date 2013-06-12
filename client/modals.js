Template.modals.helpers({
  showModal: function() {
    return Session.get("showModal");  
  }
});

Template.modals.events({
  
  'click .close-modal': function() {
    Session.set("showModal", false);
  }
  
});

Template.emailModal.helpers({
  
  hasRecipients: function() {
    var query = Recipients.find();
    return query.count() > 0 ? true : false; 
  },
  
  recipients: function() {
    return Recipients.find();
  }
  
});

Template.recipient.events({

  'click .delete-recipient': function(e, t) {
    Recipients.remove(t.data._id);
  }
  
});

Template.emailModal.rendered = function() {
  
  var recipientForm = this.find("form");
  
  $(recipientForm).validate({
    rules: {
      recipientFirstName: {
        required: true,
        onlyLetters: true
      },
      recipientEmail: {
        required: true,
        email: true
      }
    },
    messages: {
      recipientFirstName: {
        required: "",
        onlyLetters: ""
      },
      recipientEmail: {
        required: "",
        email: ""        
      }
    },
    submitHandler: function() {
      
      var recipient = {
        firstName: $("#send-timeline-recipients .recipientFirstName").val(),
        email: $("#send-timeline-recipients .recipientEmail").val()
      }
      
      Recipients.insert(recipient, function(error){
        
        if (error) { 
          console.log(error.reason); 
        } else {
          $("#send-timeline-recipients .recipientFirstName").val("");  
          $("#send-timeline-recipients .recipientEmail").val("");  
        }
        
      });         
      
    }
      
  });
  
}

Template.emailModal.events({
  
  'submit form': function(e, t) {
    
    e.preventDefault();
    
  },
  
  'click .send-timeline': function(e,t) {
  
    e.preventDefault();
    
    var recipientsList = Recipients.find().fetch();
    var sender         = Meteor.users.findOne({_id: Meteor.userId() });
    var senderName     = sender.profile.firstName + " " + sender.profile.lastName;
    var timeline       = Session.get("currentTimeline");
    var timelineObj    = Timelines.findOne({_id: timeline});
    var timelineName   = timelineObj.name;
    var timelineUrl    = "http://whatwhenapp.com/timelines/" + timeline + "/view";
    
    Meteor.call("sendTimelineEmail", recipientsList, senderName, timelineName, timelineUrl, function(error, response){
    
      if (error) {  
      
        console.log(error.reason);
      
      } else {
      
        $(".recipients-list, .no-recipients").hide();
        $(".recipients-success").fadeIn();
        mixpanel.track("Sent a Timeline");
        
        Meteor.setTimeout(function(){
          Recipients.remove({});
          $(".recipients-success").fadeOut(function(){
            $(".recipients-list, .no-recipients").show();
          });
          Session.set("showModal", false);
        }, 5 * 1000);
        
      }
      
    });
    
  }
  
});