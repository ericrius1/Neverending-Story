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
      totalRounds: globalProperties.numRounds,
      gameOver: false
    });
    observe.observe_votes(game_id);
    Timers.insert({
      _id: game_id
    });
    //link a story to a game
    var story_prompt = starting_prompts[Math.floor(Math.random() * numPrompts)];
    Stories.insert({
      _id: game_id,
      story_prompt: story_prompt,
      content: story_prompt
    });
    console.log(Stories.findOne(game_id));

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

  }
});

