Template.timelineAdd.rendered = function() {
  
  // Initialize datepicker
  
  $(".add-item-datepicker").datepick({
    showAnim: "fadeIn",
    onSelect: function(dates) {
      var picked = dates[0];
      $(".timeline-add-epoch").val(picked.setHours(0,0,0,0));
    }
  });
  
  // Initialize time entry
  
  $(".timepicker").timeEntry();
  

  // If items, scroll to top of add form. 
  
  var currentTimeline = Session.get("currentTimeline");
  var query           = timelineItems.find({timeline: currentTimeline});
  
  if (query.count() > 0) {
    var topPos = $("#timeline-add-item").position().top;
    $(window).scrollTop(topPos);
  }
  
  // Handle validation and submit item
    
  var addItemForm = this.find("form");
  
  $(addItemForm).validate({
    rules: {
      timelineType: {
        valueNotEquals: "Select type..."
      },
      timelineTitle: {
        required: true
      },
      timelineDate: {
        required: true
      }
    },
    messages: {
      timelineType: {
        required: "",
        valueNotEquals: ""
      },
      timelineTitle: {
        required: ""
      },
      timelineDate: {
        required: ""     
      }
    },
    submitHandler: function() {
    
      var timelineItem = {
        type: $("#add-item").find("[name='timelineType']").val(),
        title: $("#add-item").find("[name='timelineTitle']").val(),
        date: $("#add-item").find("[name='timelineDate']").val(),
        time: $("#add-item").find("[name='timelineTime']").val(),
        epoch: $("#add-item").find(".timeline-add-epoch").val(),
        description: $("#add-item").find("[name='timelineDescription']").val(),
        timeline: Session.get("currentTimeline"),
        owner: Meteor.userId()
      }
      
      timelineItems.insert(timelineItem, function(error, result){
        if (error) {
          console.log(error.reason);
        } else {
          mixpanel.track("Created a Timeline Item");
        }
      });
      
      $("#add-item").find("input, select, textarea").val("");    
      
    }
      
  });
  
}

Template.timelineAdd.events({
  
  'submit form': function(e, t) {
    
    e.preventDefault(); 
    
  }
});