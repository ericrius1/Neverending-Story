
Template.lobby.show_lobby = function () {
  // only show lobby if we're not in a game
  return !Meteor.clientMethods.game();
};

Template.lobby.looking = function() {
  var player = Players.findOne({_id: Session.get('player_id')});
  if(player!== undefined){
    debugger;
    return player.looking;
  }
}

Template.lobby.waiting = function () {
  //$ne selects the documents where the value of the field is not equal to the specified value
  //So in this case we're returning a list of all the players but the current one
  var players = Players.find({_id: {$ne: Session.get('player_id')},
                              name: {$ne: ''},
                              game_id: {$exists: false}, //Only select players not in a game
                              looking: true}); //player must be looking for game 
  console.log(players);

  return players;
};

Template.lobby.count = function () {
  var players = Players.find({_id: {$ne: Session.get('player_id')},
                              name: {$ne: ''},
                              game_id: {$exists: false}});

  return players.count();
};

Template.lobby.disabled = function () {
  var me = Meteor.clientMethods.player();
  if (me && me.name)
    return '';
  return 'disabled="disabled"';
};


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
