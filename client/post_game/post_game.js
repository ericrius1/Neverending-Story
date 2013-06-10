Template.post_game.show = function(){
  return client.game() && client.game().gameOver;
}