// This will be our application entry. We'll setup our server here.
// import http from 'http';
import http from 'http';

import app from './server/config/app'; // The express app we just created

const port = process.env.PORT || 5000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
/* eslint no-console: 0 */
console.log('App listening on port 5000');