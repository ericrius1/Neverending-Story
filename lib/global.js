
globalProperties = {
    minPlayersPerGame: 3,
    minWritingTime: 50,
    maxWritingTimeInterval: 5,
    votingTime: 40,
    betweenTime: 3,
    numRounds: 4,
    anonymousPlayers: true
};

global = {

  remaining_players: function() {
  
    return globalProperties.minPlayersPerGame - global.num_players_looking();
  },

  num_players_looking: function(){
    return Players.find({
      looking: true
    }).count();
  },

  start_new_round: function(game_id){
     //Wind down the game clock
    var clock = globalProperties.minWritingTime + (10 * Math.floor(globalProperties.maxWritingTimeInterval * Math.random()));
    Games.update(game_id, {$inc: {round: 1}});
    global.reset_player_info(game_id);
    var writeInterval = Meteor.setInterval(function() {
      clock -= 1;
      Timers.update(game_id, {$set: {clock: clock}});
      //end of round
      if(clock === 0){
        //stop the clock
        Meteor.clearInterval(writeInterval);
        global.start_voting(game_id);
      }

    }, 1000);
  },

  start_between_rounds: function(game_id){
    var player = global.get_winner(game_id);
    var storySoFar = Stories.findOne({_id: game_id}).content;
    var content = storySoFar + " " + player.submission;
    Stories.update({_id : game_id}, {$set: {content: content}});
    var between_clock = globalProperties.betweenTime;
    Games.update(game_id, {$set: {isBetweenRounds: true}});

    var betweenInterval = Meteor.setInterval(function(){
      between_clock -= 1;
      Timers.update(game_id, {$set: {between_clock: between_clock}})
      if(between_clock === 0){
        Meteor.clearInterval(betweenInterval);
        global.setup_new_round(game_id);
      }
    }, 1000)
  },

  start_voting: function(game_id) {
    var vote_clock = globalProperties.votingTime;
    Games.update(game_id, {$set: {isVoting: true}});

    var voteInterval = Meteor.setInterval(function(){
      vote_clock -= 1;
      Timers.update(game_id, {$set: {vote_clock: vote_clock}})
      if(vote_clock === 0){
        Meteor.clearInterval(voteInterval);
        console.log('new round');
        global.start_between_rounds(game_id);
      }
    }, 1000)
  },

  setup_new_round: function(game_id){
    var game = Games.findOne(game_id);
    Games.update(game_id, {$set: {isBetweenRounds: false}});
    Games.update(game_id, {$set: {isVoting: false}});
  

    if(game.round === game.totalRounds){
      global.end_game(game_id);
      return;
    }
    global.start_new_round(game_id);
  },

  get_winner: function(game_id){
    return Players.findOne({game_id: game_id}, {sort:{votes: -1}});
  },

  reset_player_info: function(game_id){
    Players.update({game_id: game_id}, {$set: {votes: 0, submission: "", hasVoted: false}}, {multi: true});
  },

  num_players_voted: function(game_id){
    return Players.find({game_id :game_id, hasVoted:true}).count();
  },

  all_players: function(game_id) {
    return Players.find({game_id: game_id});
  },

  //Add final story to list of collections
  end_game: function(game_id){
    Games.update(game_id, {$set: {gameOver: true}});
    Stories.update(game_id, {$set: {isEnded: true}});
  },

  getRandomArbitrary: function(min, max) {
   return Math.floor(Math.random() * (max - min) + min);
  }
}

