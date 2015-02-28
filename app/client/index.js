// counter starts at 0
Session.setDefault('counter', 0);

Template.index.helpers({
  counter: function () {
    return Session.get('counter');
  }
});

Template.index.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 1);
  }
});
