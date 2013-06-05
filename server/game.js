////////// Server only logic //////////


Meteor.startup(function() {
  var query = Players.find({
    looking: true
  });
  var handle = query.observeChanges({
    added: function() {
      console.log("player added!")
    }
  });
});