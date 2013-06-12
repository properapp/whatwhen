Meteor.startup(function() {
  
  Meteor.setTimeout(function(){
    
    var findExistingTimeline = Timelines.findOne({_id: "example", owner: "whatWhenAdmin"});
    
    if (!findExistingTimeline) {
    
      var exampleTimeline = {
        _id: "example",
        name: "Online Ordering Application",
        for: "Paul's Pastries",
        owner: "whatWhenAdmin",
        startDate: "01/01/14",
        finishDate: "01/05/14"
      };
  
      var exampleTimelineItem_1 = {
        _id: "example_001",
        title: "Down Payment",
        description: "A 50% down payment is due before the project begins.",
        date: "01/01/14",
        type: "payment-due",
        timeline: "example",
        owner: "whatWhenAdmin"
      };
      
      var exampleTimelineItem_2 = {
        _id: "example_002",
        title: "Kickoff Meeting",
        description: "We'll meet to introduce team members and review the timeline for the project.",
        date: "01/01/14",
        time: "2:30PM",
        type: "meeting",
        timeline: "example",
        owner: "whatWhenAdmin"
      };
        
      var exampleTimelineItem_3 = {
        _id: "example_003",
        title: "Wireframing & Flow: Order Form",
        description: "We'll create the wireframes and flow maps for the pastry order form.",
        date: "01/02/14",
        type: "work-day",
        timeline: "example",
        owner: "whatWhenAdmin"
      };
      
      var exampleTimelineItem_4 = {
        _id: "example_004",
        title: "Review: Wireframing - Order Form",
        description: "We'll review the wireframes we completed for the order form and outline any iteration.",
        date: "01/03/14",
        time: "11:30AM",
        type: "meeting",
        timeline: "example",
        owner: "whatWhenAdmin"
      };
      
      var exampleTimelineItem_5 = {
        _id: "example_005",
        title: "Submit Pastry Descriptions",
        description: "Paul will share information on menu items, what can be customized, and what the costs will be.",
        date: "01/04/14",
        type: "client-task",
        timeline: "example",
        owner: "whatWhenAdmin"
      };
      
      var exampleTimelineItem_6 = {
        _id: "example_006",
        title: "Prototyping",
        description: "We'll build a working prototype (based on Paul's menu) of the order form to begin testing with customers.",
        date: "01/05/14",
        type: "work-day",
        timeline: "example",
        owner: "whatWhenAdmin"
      };

      var exampleTimelineItem_7 = {
        _id: "example_007",
        title: "Customer Testing",
        description: "We'll work with some of Paul's existing customers to test out the prototype.",
        date: "01/06/14",
        type: "work-day",
        timeline: "example",
        owner: "whatWhenAdmin"
      };

      var exampleTimelineItem_8 = {
        _id: "example_008",
        title: "Review: Prototype & Customer Feedback",
        description: "We'll review what we learned from customers, discuss what to change, and finalize our goals.",
        date: "01/07/14",
        time: "3:00PM",
        type: "meeting",
        timeline: "example",
        owner: "whatWhenAdmin"
      };      

      var exampleTimelineItem_9 = {
        _id: "example_009",
        title: "Build: Production-Ready Ordering System",
        description: "We'll finalize the changes we discussed in our last review and complete a production-ready version of the application.",
        date: "01/08/14",
        type: "work-day",
        timeline: "example",
        owner: "whatWhenAdmin"
      };      

      var exampleTimelineItem_10 = {
        _id: "example_010",
        title: "Review: Final",
        description: "We'll have a final review to discuss the final product and outline future upgrades to be performed after the launch.",
        date: "01/10/14",
        time: "12:30PM",
        type: "meeting",
        timeline: "example",
        owner: "whatWhenAdmin"
      };      

      var exampleTimelineItem_11 = {
        _id: "example_011",
        title: "Final Payment",
        description: "Final payment of 50% is due for the product to ship.",
        date: "01/11/14",
        type: "payment-due",
        timeline: "example",
        owner: "whatWhenAdmin"
      };

      var exampleTimelineItem_12 = {
        _id: "example_012",
        title: "Launch",
        description: "We'll set up the server and launch the online order app to Paul's production site.",
        date: "01/12/14",
        type: "no-type",
        timeline: "example",
        owner: "whatWhenAdmin"
      };      

      /* Insert Timeline */
      
      Timelines.insert(exampleTimeline);
      
      /* Insert Items */
      
      timelineItems.insert(exampleTimelineItem_1);
      timelineItems.insert(exampleTimelineItem_2);
      timelineItems.insert(exampleTimelineItem_3);
      timelineItems.insert(exampleTimelineItem_4);
      timelineItems.insert(exampleTimelineItem_5);
      timelineItems.insert(exampleTimelineItem_6);
      timelineItems.insert(exampleTimelineItem_7);
      timelineItems.insert(exampleTimelineItem_8);
      timelineItems.insert(exampleTimelineItem_9);
      timelineItems.insert(exampleTimelineItem_10);
      timelineItems.insert(exampleTimelineItem_11);
      timelineItems.insert(exampleTimelineItem_12);               
    }
    
  }, 500);
  
});