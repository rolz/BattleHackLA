// code to run on server at startup
console.log("meteor started!!");

// Start Github Api Package
var github = new GitHub({
    version: "3.0.0", // required
    timeout: 5000     // optional
});


Accounts.onLogin(function(info) {
    // get user creds
    var username = info.user.services.github.username;
    var token = info.user.services.github.accessToken;

    ifUserExists(username, token);

});


function ifUserExists(username, token) {
    var user = UserCredentials.findOne({username:username});
    console.log(user);

    // store current user in state
    if (user) {
        console.log("user exists");
    } else {
        console.log("user doesn't exists");
        // create user account
        UserCredentials.insert({
            username: username,
            token: token
        });

        addRepos(username,token);
    }
}

function addRepos(username, token) {
    // authenticate to github and get repos
    github.authenticate({
        type: "oauth",
        token: token
    });

    // Get user repos and add to collection
    var repos = github.repos.getFromUser({
        user: username
    });

    var repoArray = [];
    for (var i = 0; i < repos.length; i++ ) {
        var allRepos = repos[i].name;
        repoArray.push(allRepos);
    }

    UserRepos.insert({
        username: username,
        repo: repoArray
    });

    addCommits(username, token);
}


function addCommits(username, token) {

    github.authenticate({
        type: "oauth",
        token: token
    });


    var repos = UserRepos.findOne({username:username});

        // store in collection
        for (var i = 0; i < repos.repo.length; i++) {

            var repoName = repos.repo[i];
            var commits = github.repos.getCommits({
                user: username,
                repo: repos.repo[i],
                author: username
            });

            var commitsCount = commits.length;

            UserCommits.insert({
                username: username,
                repo: repoName,
                commits: commitsCount
            });
        }

}


Meteor.methods({
    githubHook: function (username, repo) {
        console.log(username+" "+repo);
        var thisUser = JSON.stringify(username);
        var thisRepo = JSON.stringify(repo);

        var token = UserCredentials.findOne({username:username}).token;
        console.log(token);

        github.authenticate({
            type: "oauth",
            token: token
        });

        github.repos.createHook({
            user: thisUser,
            repo: thisRepo,
            name: 'web',
            events: ['push'],
            config: {
                url: "http://localhost:3000/webhook",
                content_type: "json"
            },
            active: true
        }, function(err, res) {
            console.log(JSON.stringify(res));
        });

        console.log('lets do it');
    }
});
