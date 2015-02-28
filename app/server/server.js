// code to run on server at startup
console.log("meteor started!!");

// restful inbound route
Router.route('/restful', {where: 'server'})
.post(function () {
    post = this.request.body;
    console.log(post);
  this.response.end('post request\n');
});
