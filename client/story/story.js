var hasAppended = false;

Template.story.content = function(){
  return client.story_content();
}

Template.story.between_rounds = function(){
  return client.is_between_rounds();
}

Template.story.appendSubmission = function(){
  if(hasAppended){
    return true
  }
  $()

}

Template.story.prompt = function(){
  var prompt =  client.get_prompt();
  debugger;
  return prompt;
}

