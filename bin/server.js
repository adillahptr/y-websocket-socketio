#!/usr/bin/env node

/**
 * @type {any}
 */
const https = require('https')
const socketIo = require("socket.io");
const fs = require("fs");
const setupWSConnection = require('./utils.js').setupWSConnection

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

const key = fs.readFileSync("./bin/private.key");
const cert = fs.readFileSync("./bin/certificate.crt");

const server = https.createServer({key, cert},(request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('okay')
})

const io = new socketIo.Server(server);


io.on('connection', (socket) => {
  setupWSConnection(socket, true)
});

server.listen(port, host, () => {
  console.log(`running at '${host}' on port ${port}`)
})
