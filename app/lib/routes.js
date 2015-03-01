
// Restful Api
Router.route('/webhook', {where: 'server'})
  .get(function () {
    this.response.end('welcome to our api\n');
  })
  .post(function () {
    var post = this.request.body;
    console.log(post);
    this.response.end('post request\n');
  });


// Client Side routes
Router.map(function() {
    // homepage
    this.route('index', {
        path: '/',
        onBeforeAction: function() {
            if (! Meteor.user()) {
                if (!Meteor.loggingIn()) {
                    this.next()
                }
            } else {
                Session.set('currentUser', Meteor.user().services.github.username);
                Router.go('dashboard');
                this.next()
            }
        }
    });

    // dashboard
    this.route('dashboard', {
        template: 'dashboard',
        path: '/dashboard',
        onBeforeAction: function() {
            if (!Meteor.user()) {
                Router.go('/');
            } else {
                this.next()
            }
        }
    });
});
