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
        globalProperties.lobbyInterval = Meteor.setInterval(function() {
          globalProperties.currentLobbyWaitingTime -= 1;
          console.log(globalProperties.currentLobbyWaitingTime);
          //end of round
          if (globalProperties.currentLobbyWaitingTime === 0) {
            globalProperties.currentLobbyWaitingTime = globalProperties.lobbyWaitingTime;
            Meteor.call('start_new_game');

          }
        }, 1000);
      }
      if (global.remaining_players() <= 0) {
       
        
        Meteor.call('start_new_game');
      }
    }
  });
});

Meteor.methods({
  start_new_game: function() {
    globalProperties.currentLobbyWaitingTime = globalProperties.lobbyWaitingTime;
    if(globalProperties.lobbyInterval!==null) {
      Meteor.clearInterval(globalProperties.lobbyInterval);
    }
    console.log("new game started")
    //create a new game
    var game_id = Games.insert({
      isVoting: false
    });
    Timers.insert({
      _id: game_id
    })
    //link a story to a game
    Stories.insert({
      _id: game_id,
      content: starting_prompts[1]
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