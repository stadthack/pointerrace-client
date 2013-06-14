/*global io */
(function () {
  'use strict'

  var socket = io.connect('http://localhost:8080');

  function onConnected() {
    console.log('Connected.');
  }

  socket.on('connected', onConnected);
}());
