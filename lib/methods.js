
Meteor.globalMethods = {

  remaining_players: function() {
    console.log(Meteor.globalProperties.minPlayersPerGame);
    var numPlayersLooking = Players.find({
      looking: true
    }).count();
    return Meteor.globalProperties.minPlayersPerGame - numPlayersLooking;
  }
}