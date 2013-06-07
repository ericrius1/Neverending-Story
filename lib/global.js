
globalProperties = {
    minPlayersPerGame: 2,

};

global = {

  remaining_players: function() {
    var numPlayersLooking = Players.find({
      looking: true
    }).count();
    return globalProperties.minPlayersPerGame - numPlayersLooking;
  },

  start_new_round: function(game_id){
     //Wind down the game clock
    console.log("shnur")
    var clock = 3;
    var interval = Meteor.setInterval(function() {
      clock -= 1;
      Timers.update(game_id, {$set: {clock: clock}});
      //end of round
      if(clock === 0){
        //stop the clock
        Meteor.clearInterval(interval);

      }

    }, 1000);
  }




}
