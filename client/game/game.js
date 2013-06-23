Template.game.show = function() {
  return client.game()!==undefined && !client.game().gameOver; 
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
  return client.selected_player_submission();
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

Template.game.between_rounds = function() {
  return client.is_between_rounds();
}

Template.game.round_winner = function(){
  return client.round_winner();
}


Template.game.vote_timer = function() {
  return client.timer().vote_clock;
}

Template.game.players = function() {
  return client.all_players();
}

Template.game.round_winner = function(){
  return global.get_winner(client.player().game_id).name;
}

Template.game.current_round = function(){
  return client.current_round();

}

Template.game.total_rounds = function(){
  return client.total_rounds();
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
    Players.update({_id: id}, {$inc: {votes: 1}});
    Players.update(client.player()._id, {$set: {hasVoted: true}});
  },

  'keyup #storyInput': function(evt){
    var submission = $('#storyInput').val();
    console.log(submission);
    Players.update(Session.get('player_id'), {$set:{submission: submission}});
  }
});

