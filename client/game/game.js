Template.game.show_game = function() {
  console.log(Meteor.clientMethods.game()!==undefined);
  return Meteor.clientMethods.game()!==undefined; 
}

Template.game.players = function() {
  return Meteor.clientMethods.game().players;
}
