

Template.scratchpad.show = function () {
  return Meteor.clientMethods.game() && Meteor.clientMethods.game().clock > 0;
};

