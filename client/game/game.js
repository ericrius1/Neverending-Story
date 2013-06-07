Template.game.show = function() {
  console.log(client.game()!==undefined);
  return client.game()!==undefined; 
}

Template.clock.clock = function() {
  return client.timer().clock
  
}

Template.game.players = function() {
  debugger;
  return client.other_players();
}

Template.player.player = function(){
  return client.player();
}
