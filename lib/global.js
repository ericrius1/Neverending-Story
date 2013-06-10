
globalProperties = {
    minPlayersPerGame: 3,
    writingTime: 15,
    playerExitTimeCheck: 20,
    numRounds: 3
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
    var clock = globalProperties.writingTime;
    Games.update(game_id, {$inc: {round: 1}});
    global.reset_player_info(game_id);
    console.log("NEW ROUND");
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

  start_voting: function(game_id) {
    Games.update(game_id, {$set: {isVoting: true}});
  },

  setup_new_round: function(game_id){
    Games.update(game_id, {$set: {isVoting: false}});
    var player = global.get_winner(game_id);
    var storySoFar = Stories.findOne({_id: game_id}).content;
    var content = storySoFar + player.submission;
    Stories.update({_id : game_id}, {$set: {content: content}});
    if(Games.findOne(game_id).round > globalProperties.numRounds){
      global.end_game(game_id);
      return;
    }
    global.start_new_round(game_id);
  },

  get_winner: function(game_id){
    return Players.findOne({game_id: game_id}, {sort:{votes: -1}});
  },

  reset_player_info: function(game_id){
    Players.update({game_id: game_id}, {$set: {votes: 0, submission: " ", hasVoted: false}});
  },

  num_players_voted: function(game_id){
    return Players.find({game_id :game_id, hasVoted:true}).count();
  },

  all_players: function(game_id) {
    return Players.find({game_id: game_id});
  },

  end_game: function(game_id){
    Games.update(game_id, {$set: {gameOver: true}});
  }
}
