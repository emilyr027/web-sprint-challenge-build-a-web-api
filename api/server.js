const express = require('express');
const server = express();
const Actions = require('./actions/actions-router')
const Projects = require('./projects/projects-router')

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json())
server.use('/api/actions', Actions)
server.use('/api/projects', Projects )

module.exports = server;