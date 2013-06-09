client = {

  player: function() {
    return Players.findOne(Session.get('player_id'));

  },

  game: function() {
    var me = client.player();
    return me && me.game_id && Games.findOne(me.game_id);
  },

  other_players: function() {
    var me = client.player();
    return Players.find({_id: {$ne: Session.get('player_id')},
                          game_id: me.game_id});

  },

  player_join: function(){
    Players.update(Session.get('player_id'), {
      $set: {
        looking: true
      }
    });
  },

  selected_player_submission: function(selectedPlayerId){
    return Players.findOne({_id: selectedPlayerId}).submission;
  },

  all_players: function() {
    var me = client.player();
    return Players.find({game_id: me.game_id});
  },

  timer: function() {
    var me = client.player();
    return me && me.game_id && Timers.findOne(me.game_id);
  },

  is_voting: function() {
    return client.game().isVoting;
  },

  save_submission: function() {
    var submission = $('.storyInput').val();
    Players.update(Session.get('player_id'), {$set:{submission: submission}})
  },

  story_content: function() {
    var player = client.player();
    story = Stories.findOne(player.game_id)
    if(story!== undefined){
      return story.content;
    }
  }

};