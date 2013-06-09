
globalProperties = {
    minPlayersPerGame: 2,
    writingTime: 60,
    votingTime: 40
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
    var clock = globalProperties.writingTime;
    global.reset_player_info(game_id);
    var interval = Meteor.setInterval(function() {
      clock -= 1;
      Timers.update(game_id, {$set: {clock: clock}});
      //end of round
      if(clock === 0){
        //stop the clock
        Meteor.clearInterval(interval);
        global.start_voting(game_id);
      }

    }, 1000);
  },

  start_voting: function(game_id) {
    //$('.storyInput').focus();
    Games.update(game_id, {$set: {isVoting: true}});
    var clock = globalProperties.writingTime;
    var interval = Meteor.setInterval(function() {
      clock -= 1;
      Timers.update(game_id, {$set: {clock: clock}});
      //end of round
      if(clock === 0){
        //stop the clock
        Meteor.clearInterval(interval);
        Games.update(game_id, {$set: {isVoting: false}});
        global.update_story(game_id)
        global.start_new_round(game_id);
      }

    }, 1000);
  },

  update_story: function(game_id){
    var player = Players.findOne({game_id: game_id}, {sort:{votes: -1}});
    var storySoFar = Stories.findOne({_id: game_id}).content;
    var content = storySoFar + player.submission;
    console.log(content);
    Stories.update({_id : game_id}, {$set: {content: content}});
  },

  reset_player_info: function(game_id){
    Players.update({game_id: game_id}, {$set: {votes: 0, submission: "this should not be appearing!"}});
  }

}
