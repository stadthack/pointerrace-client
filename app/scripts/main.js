/*global io, StateMachine */
(function () {
  'use strict';

  var socket = io.connect('http://localhost:8080');
  var PlayerState = function () {
    this.startup();
  };

  StateMachine.create({
    target: PlayerState.prototype,
    events: [
      { name: 'startup', from: 'none', to: 'connecting' },
      { name: 'connect', from: 'connecting', to: 'connected' }
    ]
  });

  function Player() {
    this.uuid = null;
    this.state = new PlayerState();
  }

  var players = {
    self: new Player()
  };

  function onServerstate(data) {
    console.log('server state: ', data);
  }

  function onConnected(data) {
    var self = players.self;

    self.uuid = data.uuid;
    self.state.connect();

    console.log('Player state: ', self.state.current);

    // Don't work with server state before player initialization has happened.
    socket.on('serverstate', onServerstate);
  }

  document.addEventListener('mousemove', function (event) {
    var x = (event.pageX / document.width * 100).toFixed(2);
    var y = (event.pageY / document.height * 100).toFixed(2);

    socket.emit('move', { x: x, y: y });
  });

  socket.on('connected', onConnected);
}());
