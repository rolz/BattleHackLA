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
    console.log(Session.get('currentUser'));
    return JSON.stringify(UserRepos.findOne({username:Session.get('currentUser')}));
  }
});
