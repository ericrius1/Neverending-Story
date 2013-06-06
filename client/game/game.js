Template.game.show_game = function() {
  console.log(client.game()!==undefined);
  return client.game()!==undefined; 
}

Template.game.clock = function() {
  return client.game().clock
  
}

Template.game.players = function() {
  return client.game().players;
}
