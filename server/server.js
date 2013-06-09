////////// Server only logic //////////



Meteor.startup(function() {
  Players.update({}, {looking: false})
  var query = Players.find({
    looking: true
  });
  var handle = query.observeChanges({
    added: function() {

      //Start timer if at least two players are looking for a game
      if (global.num_players_looking() >= 2) {
       
      }
      if (global.remaining_players() <= 0) {
        Meteor.call('start_new_game');
      }
    }
  });
});

Meteor.methods({
  start_new_game: function() {
    var numPrompts = Object.keys(starting_prompts).length;
    console.log("new game started")
    //create a new game
    var game_id = Games.insert({
      isVoting: false,
      round: 1
    });
    Timers.insert({
      _id: game_id
    })
    //link a story to a game
    Stories.insert({
      _id: game_id,
      content: starting_prompts[Math.floor(Math.random() * numPrompts)]
    });

    //Move everyone who declared themselves ready in the lobby into the game
    Players.update({
      game_id: null,
      looking: true
    }, {
      $set: {
        game_id: game_id,
        looking: false,
        votes: 0
      }
    }, {
      multi: true
    });


    var p = Players.find({
      game_id: game_id
    }, {
      fields: {
        _id: true,
        name: true
      }
    }).fetch();
    Games.update({
      _id: game_id
    }, {
      $set: {
        players: p
      }
    });
    global.start_new_round(game_id);

  }
});