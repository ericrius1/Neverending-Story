////////// Shared code (client and server) //////////

Games = new Meteor.Collection('games');

Timers = new Meteor.Collection('timers');

Players = new Meteor.Collection('players');

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


}