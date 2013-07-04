var hasAppended = false;

Template.story.content = function() {
  return client.story_content();
}

Template.story.between_rounds = function() {
  return client.is_between_rounds();
}


Template.story.story_prompt = function() {
  var story_prompt = client.get_story_prompt();

  return story_prompt;
}



appendSubmission = function(game_id){
  var winning_submission = global.get_winner(game_id).submission;
  console.log("appending");
  $('#story_content').append(winning_submission);
}
