Template.game.show_game = function() {
  return Meteor.clientMethods.game(); 
}

Template.game.players = function() {
  return Players.find({game_id: Meteor.clientMethods.game()});
}