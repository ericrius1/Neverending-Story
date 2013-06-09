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

  setup_round: function(){
    var me = client.player();
    var round = Games.findOne(me.game_id).round;

    var currentRound = Session.get("game.round") || null;
    if (currentRound && currentRound !== round) {
      console.log("new round");
      Session.set("game.activeTab", me._id);  
    }
    Session.set("game.round", round);
  },

  player_join: function(){
    // When joining, all players are looking by default
    var playerObject = {looking: true};

    // If they're the first player looking, make them the room's admin
    if (Players.find({looking: true}).count() === 0) {
      _.extend(playerObject, {admin: true});
    }

    Players.update(Session.get('player_id'), {
      $set: playerObject
    });
  },

  can_begin: function(){
    return global.num_players_looking()>=2 && client.player().admin;
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
    console.log(submission);
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