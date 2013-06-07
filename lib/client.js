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

  timer: function() {
    var me = client.player();
    return me && me.game_id && Timers.findOne(me.game_id);
  },

  is_voting: function() {
    return client.game().isVoting;
  }

};