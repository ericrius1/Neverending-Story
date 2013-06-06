
Meteor.globalMethods = {

  remaining_players: function() {
    var numPlayersLooking = Players.find({
      looking: true
    }).count();
    console.log(Meteor.globalProperties.minPlayersPerGame - numPlayersLooking);
    return Meteor.globalProperties.minPlayersPerGame - numPlayersLooking;
  }
}