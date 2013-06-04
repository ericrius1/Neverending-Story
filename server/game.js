////////// Server only logic //////////

Meteor.methods({
  start_new_game: function () {
    var game_id = Games.insert({clock: 120});

    // move everyone who is ready in the lobby to the game
    //multi: true modifies all the matching documents. 
    //In this case it will move all the ready players to the game instead of just one
    Players.update({game_id: null, idle: false, name: {$ne: ''}},
                   {$set: {game_id: game_id}},
                   {multi: true});
    // Save a record of who is in the game, so when they leave we can
    // still show them.
    var p = Players.find({game_id: game_id},
                         {fields: {_id: true, name: true}}).fetch();
    Games.update({_id: game_id}, {$set: {players: p}});

    // wind down the game clock
    var clock = 120;
    var interval = Meteor.setInterval(function () {
      clock -= 1;
      Games.update(game_id, {$set: {clock: clock}});

      // end of game
      if (clock === 0) {
        // stop the clock
        Meteor.clearInterval(interval);
      }
    }, 1000);

    return game_id;
  }
});


