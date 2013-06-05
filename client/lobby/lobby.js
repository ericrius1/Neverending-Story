
Template.lobby.show_lobby = function () {
  // only show lobby if we're not in a game
  return !Meteor.clientMethods.game();
};

Template.lobby.looking = function() {
  var player = Players.findOne({_id: Session.get('player_id')});
  if(player!== undefined){
    return player.looking;
  }
}

Template.lobby.remaining_players = function() {
  return Meteor.clientMethods.remaining_players();
}



Template.lobby.events({
  'keyup input#myname': function (evt) {
    var name = $('#lobby input#myname').val().trim();
    Players.update(Session.get('player_id'), {$set: {name: name}});
  },
  'click button.join_story': function () {
    Players.update(Session.get('player_id'), {$set: {looking: true}})
  }
});

//////
////// Initialization
//////

Meteor.startup(function () {
  // Allocate a new player id.
  //
  // XXX this does not handle hot reload. In the reload case,
  // Session.get('player_id') will return a real id. We should check for
  // a pre-existing player, and if it exists, make sure the server still
  // knows about us.
  var player_id = Players.insert({name: ''});
  Session.set('player_id', player_id);

  Deps.autorun(function () {
    Meteor.subscribe('players');

    if (Session.get('player_id')) {
      var me = Meteor.clientMethods.player();
      if (me && me.game_id) {
        Meteor.subscribe('games', me.game_id);
      }
    }
  });


});
