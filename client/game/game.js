Template.game.show_game = function() {
  console.log(client.game()!==undefined);
  return client.game()!==undefined; 
}

Template.clock.clock = function() {
  debugger;
  return client.timer().clock
  
}

Template.game.players = function() {
  return client.game().players;
}
