Template.players.all_players = function() {
  return client.all_players();
}

Template.players.anonymous_players = function(){
  return globalProperties.anonymousPlayers;
}