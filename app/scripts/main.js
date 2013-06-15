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
    this.id = null;
    this.pointer = null;
    this.state = new PlayerState();
  }

  Player.prototype.update = function update(state) {
    if (!state) {
      console.error('Invalid player state: ', state);
    }
    if (this.pointer === null) {
      this._initPointer();
    }
    var transform = this._getPointerTransform(state);
    this.pointer.style['-webkit-transform'] = transform;
    this.pointer.style.transform = transform;
  };

  Player.prototype.destroy = function destroy() {
    console.log('Destroying ', this.id);
    if (this.pointer) {
      console.log('Removing ', this.pointer);
      this.pointer.parentElement.removeChild(this.pointer);
    }
  };

  Player.prototype._getPointerTransform = function _getPointerTransform(state) {
    var x = state.x * document.body.clientWidth;
    var y = state.y * document.body.clientHeight;
    return 'translate(' + x + 'px, ' + y + 'px)';
  };

  Player.prototype._initPointer = function _initCursor() {
    console.log('Initializing new Pointer.');
    this.pointer = document.createElement('div');
    this.pointer.className = 'pointer';
    game.$pointersThem.appendChild(this.pointer);
  };

  var players = {
    self: new Player(),
    others: {}
  };

  var game = {
    $pointersThem: document.querySelector('.pointers-layer .pointers-them'),
    $pointersUs: document.querySelector('.pointers-layer .pointers-us'),
    // TODO: Handle players disconnects. Idea: Make this through an event.
    updatePlayers: function updatePlayers(playerData) {
      playerData.forEach(function (data) {
        var player;
        if (data.id === players.self.id) {
          return;  // continue
        }

        player = players.others[data.id];
        if (player === undefined) {
          console.log('Instantiating new Player ', data.id);
          player = players.others[data.id] = new Player();
        }

        player.update(data);
      });
    }
  };

  function onServerstate(data) {
    game.updatePlayers(data.players);
  }

  function onConnected(data) {
    var self = players.self;

    self.id = data.id;
    self.state.connect();

    console.log('Player state: ', self.state.current);

    // Don't work with server state before player initialization has happened.
    socket.on('serverstate', onServerstate);
  }

  function onPlayerDisconnected(data) {
    console.log('Player ', data, ' disconnected.');

    var player = players.others[data.player.id];

    if (player) {
      player.destroy();
      delete players.others[data.player.id];
    } else {
      console.log('Did not know of a player ', data.player.id,
          '. Skipping destruction. Lucky bastard.');
      console.log(players);
    }
  }

  document.addEventListener('mousemove', function (event) {
    var x = (event.pageX / document.body.clientWidth);
    var y = (event.pageY / document.body.clientHeight);

    players.self.update({ x: x, y: y });
    socket.emit('move', { x: x, y: y });
  });

  socket.on('connected', onConnected);
  socket.on('player disconnected', onPlayerDisconnected);
}());
