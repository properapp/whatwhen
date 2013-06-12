Template.timelineItem.helpers({
    
  itemType: function() {
    var item = this.type;
    var typeName = item.replace("-", " ");
    return typeName; 
  },
  
  hasDescription: function() {
    var description = this.description;
    return description ? "has-description" : "no-description";
  },
  
  editing: function() {
    return Session.get("edit-" + this._id);
  },
  
  notPublicView: function() {
    return  Meteor.Router.page() != "timelinePublic" ? true : false;
  },
  
  isToday: function() {

    var currentDate  = (new Date).setHours(0,0,0,0);
    var itemEpoch    = this.epoch;
    var tomorrow     = (new Date).setHours(0,0,0,0) + 24 * 60 * 60 * 1000;
    
    if ( (itemEpoch >= currentDate) && (itemEpoch < tomorrow) ) {
      return true;
    }
    
  }, 
  
  isPassed: function() {
    var itemEpoch    = this.epoch;    
    var currentDate  = (new Date).setHours(0,0,0,0);

    if (itemEpoch < currentDate) {
      return true;
    }

  }
  
});

Template.timelineItem.rendered = function() {

  $(".datepicker-edit-item").datepick({
    showAnim: "fadeIn",
    onSelect: function(dates) {
      var picked = dates[0];
      $(".timeline-edit-epoch").val(picked.setHours(0,0,0,0));
    }
  });
  
  $(".timepicker").timeEntry();
  
}

Template.timelineItem.events({
  
  'click .edit-timeline-item': function(e, t) {
    e.preventDefault();
    
    Session.set("edit-" + t.data._id, true);

    var itemType = t.data.type;
    
    setTimeout(function(){ 
      t.find("select").setAttribute("value", itemType); 
      t.find("select option[value='"+itemType+"']").selected = true; 
    }, 1);

  },
  
  'click .cancel-edit-timeline-item': function(e, t) {
    Session.set("edit-" + t.data._id, false);
  },
  
  'submit form': function(e, t) {
    
    e.preventDefault();
    
    var timelineItem = {
      date: t.find("[name='ti-date-edit']").value,
      epoch: t.find(".timeline-edit-epoch").value,
      time: t.find("[name='ti-time-edit']").value,
      type: t.find("[name='ti-type-edit']").value,
      title: t.find("[name='ti-title-edit']").value,
      description: t.find("[name='ti-description-edit']").value
    }
    
    timelineItems.update(t.data._id, {$set: { date: timelineItem.date, epoch: timelineItem.epoch, time: timelineItem.time, type: timelineItem.type, title: timelineItem.title, description: timelineItem.description }});

    Session.set("edit-" + t.data._id, false);
    
  },
    
  'click .ss-delete': function(e) {
    
    var confirmDelete = confirm("Are you sure? This will remove this item permanently.");
    
    if(confirmDelete) {
      timelineItems.remove(this._id);
    }
     
  }
  
});