Meteor.subscribe('userCredentials');
Meteor.subscribe('userRepos');

Template.index.helpers({
  user: function() {
    //  var userInfo =  Meteor.user().services.github.email;
    return JSON.stringify(UserRepos.find().fetch());
  }
});

Template.dashboard.events({
  'click .add': function(event) {
    var user = Session.get('currentUser');
    var repo = this.repo;
    console.log("repo" + repo);

    Meteor.call('githubHook', user, repo, function(err, response) {});
  }
});

Template.dashboard.helpers({
  repos: function() {
    return UserCommits.find({username:Session.get('currentUser')});
  }
});
