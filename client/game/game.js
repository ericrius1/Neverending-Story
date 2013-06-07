Template.game.show = function() {
  console.log(client.game()!==undefined);
  return client.game()!==undefined; 
}

Template.game.my_name = function(){
  return client.player().name;
}


Template.clock.clock = function() {
  return client.timer().clock
}
