Template.game.show = function() {
  return client.game()!==undefined; 
}

Template.game.setup_round = function() {
  client.setup_round();
}

Template.story.content = function(){
  return client.story_content();
}


Template.game.my_name = function(){
  return client.player().name;
}

Template.game.me = function(){
  if(Session.get('game.activeTab') === client.player()._id ){
    return true;
  }
  return false;
}

Template.game.submission = function(){
  if(!client.is_voting())return "";
  var selectedPlayerId = Session.get('game.activeTab');
  return client.selected_player_submission(selectedPlayerId);
}

Template.game.selected= function(){
  //returns selected if the current tab is our active tab otherwise our own tab is active
  if(!client.is_voting()){
    return this._id === client.player()._id? "selected" : '';
  }
  return this._id === Session.get('game.activeTab')? 'selected' : '';
}

Template.game.readonly = function(){
  //returns readonly if we are in voting round or selected tab is not our own
  return client.is_voting() || Session.get('game.activeTab') !== client.player()._id ? "readonly" : "";
}

Template.game.voting = function() {
  return client.is_voting();
}


Template.clock.clock = function() {
  return client.timer().clock
}

Template.game.players = function() {
  return client.all_players();
}

Template.game.getActiveTab = function() {
  return Session.get('game.activeTab');
}

Template.game.events({
  'click nav.tabs > a': function(evt) {
    if(!client.is_voting())return;
    var id = $(evt.target).data('playerId');
    Session.set('game.activeTab', id);
    $(evt.target).attr('selected', 'selected');
  },

  'click label.approved': function(evt){
    var id = Session.get('game.activeTab');
    Players.update({_id: id}, {$inc: {votes: 1}, $set: {hasVoted: true}});
    //Players.update({_id: id}, {$set: {hasVoted: true}});
  }
});

