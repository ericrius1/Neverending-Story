////////// Shared code (client and server) //////////

Games = new Meteor.Collection('games');

Stories = new Meteor.Collection('stories');
//Each game has a story

Timers = new Meteor.Collection('timers');
//Each game has a timer

Players = new Meteor.Collection('players');
//Each game has multiple players

if (Meteor.isServer) {
  // publish all the players
  Meteor.publish('players', function() {
    return Players.find({});
  });

  Players.allow({
    insert: function() {
      return true;
    },

    update: function() {
      return true;
    }
  });

  // publish single games
  Meteor.publish('games', function(id) {
    check(id, String);
    return Games.find({
      _id: id
    });
  });

  Meteor.publish('timers', function(){
    return Timers.find({});
  });

  Meteor.publish('stories', function(){
    return Stories.find({});
  })


}