// Clientside routes
Router.route('/', function () {
  this.render('index');
});

// Restful Api
Router.route('/restful', {where: 'server'})
  .get(function () {
    this.response.end('welcome to our api\n');
  })
  .post(function () {
    var post = this.request.body;
    console.log(post);
    this.response.end('post request\n');
  });
