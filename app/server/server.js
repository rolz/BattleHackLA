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

    github.authenticate({
        type: "oauth",
        token: token
    });

    // store current user in state
    if (user) {
        console.log("user exists");
        var repos = UserRepos.findOne({username:username});

        for (var i = 0; i < repos.repo.length; i++) {

            var commits = github.repos.getCommits({
                user: username,
                repo: repos.repo[i],
                author: username
            });
            console.log(commits.length);
        }


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


}
