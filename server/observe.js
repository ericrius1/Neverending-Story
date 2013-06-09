observe = {

  observe_players_looking: function(){
    var query = Players.find({
        looking: true
      });
      var handle = query.observeChanges({
        added: function() {
          if (global.remaining_players() <= 0) {
            Meteor.call('start_new_game');
          }
        }
      });
  },

  observe_votes: function(game_id){
    //anytime a player votes, add to count
    var query = Players.find({game_id: game_id, hasVoted:true});
    var handle = query.observeChanges({
      added: function() {
        //all players have voted, let's reveal the winner!
        if(global.num_players_voted(game_id)===global.all_players(game_id).count()){
          global.setup_new_round(game_id);
        }
      }
    })
  }
}