////////// Shared code (client and server) //////////

Games = new Meteor.Collection('games');
//{game_id: 3872, clock: 32}


Players = new Meteor.Collection('players');
// {name: 'matt', game_id: 123}


Meteor.methods({
  
});


if (Meteor.isServer) {
  // publish all the players
  Meteor.publish('players', function () {
    return Players.find({});
  });

  Players.allow({
    insert: function () {
      return true ;
    },

    update: function() {
      return true;
    }
  });

  // publish single games
  Meteor.publish('games', function (id) {
    check(id, String);
    return Games.find({_id: id});
  });

  
}

