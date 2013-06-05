////////// Server only logic //////////

var numPlayersLooking;
var numPlayersPerGame;

Meteor.startup(function() {
  numPlayersLooking=0;
  numPlayersPerGame = 2;
  var query = Players.find({
    looking: true
  });
  var handle = query.observeChanges({
    added: function() {
      numPlayersLooking++;
      console.log(numPlayersLooking);
      if(numPlayersLooking == numPlayersPerGame){
        Meteor.call("start_new_game");
      }
    }
  });
});

Meteor.methods({

  start_new_game: function(){
    console.log("new game started")
    //create a new game
    var game_id = Games.insert({});

    //Move everyone who declared themselves ready in the lobby into the game
    Players.update({game_id: null, looking:true},
      {$set: {game_id: game_id}},
      {multi: true});
    //Once we have moved these players into a new game, 
    //set numPlayersLooking back to 0
    numPlayersLooking = 0;
  }

});
