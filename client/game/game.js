Template.game.show = function() {
  console.log(client.game()!==undefined);
  return client.game()!==undefined; 
}


Template.clock.clock = function() {
  return client.timer().clock
}

Template.game.other_players = function() {
  return client.other_players();
}

Template.other_player.voting = function(){
  return client.is_voting();
}

Template.player.player = function(){
  return client.player();
}

Template.player.my_name = function(){
  return client.player().name;
}
