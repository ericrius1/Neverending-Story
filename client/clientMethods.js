client = {

  player: function() {
    return Players.findOne(Session.get('player_id'));

  },

  game: function() {
    var me = client.player();
    return me && me.game_id && Games.findOne(me.game_id);
  },

};