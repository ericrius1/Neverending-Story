Meteor.clientMethods = {

  player: function() {
    return Players.findOne(Session.get('player_id'));

  },

  game: function() {
    var me = Meteor.clientMethods.player();
    return me && me.game_id && Games.findOne(me.game_id);
  },

  remaining_players: function() {
    console.log(Meteor.globalProperties.minPlayersPerGame);
  }


};