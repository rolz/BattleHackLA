// code to run on server at startup
console.log("meteor started!!");


//secure
UserCredentials.allow({
    insert: function() {
        return true;
    },
    remove: function() {
        return true;
    }
});

UserRepos.allow({
    insert: function() {
        return true;
    },
    remove: function() {
        return true;
    }
});


// Start Github Api Package
var github = new GitHub({
    version: "3.0.0", // required
    timeout: 5000     // optional
});


Accounts.onLogin(function(info) {
    // get user creds
    var username = info.user.services.github.username;
    var token = info.user.services.github.accessToken;

    // put user creds in collection
    UserCredentials.insert({
        username: username,
        token: token
    });

    // authenticate to github and get repos
    github.authenticate({
        type: "oauth",
        token: token
    });

    // Get user repos and add to collection
    var repos = github.repos.getFromUser({
        user: username
    });

    for (var i = 0; i < repos.length; i++ ) {
        var repo = repos[i].name;
        UserRepos.insert({
            repo: repo
        });
    }


    // console.log(repos);

});
