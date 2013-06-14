/*global io, StateMachine */
(function () {
  'use strict';

  var socket = io.connect('http://localhost:8080');
  var ConnectionState = function () {
    this.startup();
  };

  StateMachine.create({
    target: ConnectionState.prototype,
    events: [
      { name: 'startup', from: 'none', to: 'connecting' },
      { name: 'connected', from: 'connecting', to: 'connected' }
    ]
  });

  function Player() {
    this.uuid = null;
    this.state = new ConnectionState();
  }

  var players = {
    self: new Player()
  };

  function onConnected(data) {
    var self = players.self;

    self.uuid = data.uuid;
    self.state.connected();

    console.log('Player state: ', self.state.current);
  }

  socket.on('connected', onConnected);
}());
