Template.story.content = function(){
  return client.story_content();
}

Template.story.between_rounds = function(){
  return client.is_between_rounds();
}