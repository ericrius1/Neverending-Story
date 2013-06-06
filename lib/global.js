
globalProperties = {
    minPlayersPerGame: 2,

};

global = {

  remaining_players: function() {
    var numPlayersLooking = Players.find({
      looking: true
    }).count();
    return globalProperties.minPlayersPerGame - numPlayersLooking;
  }
}
