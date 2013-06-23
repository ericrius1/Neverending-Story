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

//NEED TO FIX THIS
// observe_vote_stage_ended = function() {

//   //anytime a player votes, add to count
//   var query = Games.find({
//     game_id: game_id,
//     isBetweenRounds: true
//   });
//   var handle = query.observeChanges({
//     added: function() {
//       appendSubmission(game_id);
//     }
//   });
// }

appendSubmission = function(game_id){
  var winning_submission = global.get_winner(game_id).submission;
  console.log("appending");
  debugger;
  $('#story_content').append(winning_submission);
}

Meteor.startup(function(){
  //observe_vote_stage_ended();
})