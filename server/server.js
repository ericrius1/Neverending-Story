////////// Server only logic //////////



Meteor.startup(function() {
  Players.update({}, {looking: false})
  observe.observe_players_looking();
});

Meteor.methods({
  start_new_game: function() {

    var numPrompts = Object.keys(starting_prompts).length;
    console.log("new game started")
    //create a new game
    var game_id = Games.insert({
      isVoting: false,
      round: 0,
      totalRounds: global.getRandomArbitrary(3, 6),
      gameOver: false
    });
    observe.observe_votes(game_id);
    Timers.insert({
      _id: game_id
    })
    //link a story to a game
    var prompt = starting_prompts[Math.floor(Math.random() * numPrompts)];
    Stories.insert({
      _id: game_id,
      prompt: prompt,
      content: prompt
    });

    //Move everyone who declared themselves ready in the lobby into the game
    Players.update({
      game_id: null,
      looking: true
    }, {
      $set: {
        game_id: game_id,
        looking: false,
        votes: 0,
        hasVoted: false
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

  },

  keepalive: function (player_id) {
    check(player_id, String);
    Players.update({_id: player_id},
                   {$set: {last_keepalive: (new Date()).getTime()}});

  }
});

// Meteor.setInterval(function () {
//   var now = (new Date()).getTime();
//   var remove_threshold = now - 5*1000;
//   //Players.remove({$lt : {last_keepalive: remove_threshold}});

// }, 100 * 1000);