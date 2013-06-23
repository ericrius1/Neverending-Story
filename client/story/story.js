var hasAppended = false;

Template.story.content = function() {
  return client.story_content();
}

Template.story.between_rounds = function() {
  return client.is_between_rounds();
}

Template.story.appendSubmission = function() {

}

Template.story.story_prompt = function() {
  var story_prompt = client.get_story_prompt();

  return story_prompt;
}

//NEED TO FIX THIS
observe_vote_stage_ended = function(game_id) {
  //anytime a player votes, add to count
  var query = Games.find({
    game_id: game_id,
    isBetweenRounds: true
  });
  var handle = query.observeChanges({
    added: function() {
    }
  });
}

Meteor.startup(function(){
  observe_vote_stage_ended();
})