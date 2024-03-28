#!/usr/bin/env node

/**
 * @type {any}
 */
const WebSocket = require('ws')
const http = require('http')
const socketIo = require("socket.io");
const setupWSConnection = require('./utils.js').setupWSConnection

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

const server = http.createServer((request, response) => {
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
