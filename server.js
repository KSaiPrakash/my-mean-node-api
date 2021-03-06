const express = require('express');

const http = require('http');
const app = express();

const debug = require('debug')('api:server');

const bodyParser = require('body-parser');

/** add mongoose */
const { mongoose } = require('./db/mongoose.js');

/** add middleware  */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Load in the mongoose models */
const { Registration } = require('./db/models')

/** Route handlers
 *  registration routes 
 *  Get /registration to get all profile
*/
app.get('/registration', (req, res)=> {
  /** We want to return an array of all the list in the db*/
  Registration.find().then((profile)=> {
    console.log(profile);
    res.send(profile);
  }).catch((e) => {
    console.log(e);
    res.send(e);
  })
});

app.post('/registration', (req, res)=> {
    /** Create a new list */
    let newList = new Registration(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname
      });
    newList.save().then((listDoc)=> {
      /** returning the newly created record's mongo _id */
      res.status('200').send(listDoc._id);
    })
});

app.patch('/registration/:id', (req, res)=> {

});

app.delete('/registration/:id', (req, res)=> {

});

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
console.log(`Sai's mean app running on ${port}`)
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


module.exports = app;