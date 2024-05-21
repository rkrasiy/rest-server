const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';

    //Middlewears
    this.middlewears();

    //App router
    this.routes();
  }

  middlewears(){

    //CORS
    this.app.use( cors() );

    //Read & Parse body request
    this.app.use( express.json() );

    //Public directory
    this.app.use( express.static('public') );
  }

  routes(){
    this.app.use(this.usersPath, require('../routes/user'));
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log(`App is running on port: ${this.port}`)
    })
  }
}

module.exports = Server;