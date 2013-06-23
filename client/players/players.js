Template.players.all_players = function() {
  return client.all_players();
}

Template.players.anonymous_players = function(){
  return globalProperties.anonymousPlayers;
}

Template.players.selected= function(){
  //returns selected if the current tab is our active tab otherwise our own tab is active
  if(!client.is_voting()){
    return this._id === client.player()._id? "selected" : '';
  }
  return this._id === Session.get('game.activeTab')? 'selected' : '';
}

