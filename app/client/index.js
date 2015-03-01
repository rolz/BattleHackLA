Meteor.subscribe('userCredentials');
Meteor.subscribe('userRepos');

Template.index.helpers({
  user: function() {
    //  var userInfo =  Meteor.user().services.github.email;
    return JSON.stringify(UserRepos.find().fetch());
  }
});

Template.dashboard.helpers({
  repos: function() {
    //  var userInfo =  Meteor.user().services.github.email;
    return JSON.stringify(UserRepos.find().fetch());
  }
});
