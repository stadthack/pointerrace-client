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

  Player.prototype.update = function update(state, isUs) {
    if (!state) {
      console.error('Invalid player state: ', state);
    }
    if (this.pointer === null) {
      this._initPointer(isUs);
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
    return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
  };

  Player.prototype._initPointer = function _initCursor(isUs) {
    console.log('Initializing new Pointer.');
    this.pointer = document.createElement('div');
    this.pointer.className = 'pointer';
    if (isUs) {
      game.$pointersUs.appendChild(this.pointer);
    } else {
      game.$pointersThem.appendChild(this.pointer);
    }
  };

  var players = {
    self: new Player(),
    others: {}
  };

  var game = {
    $pointersThem: document.querySelector('.pointers-layer .pointers-them'),
    $pointersUs: document.querySelector('.pointers-layer .pointers-us'),
    $playerCount: document.querySelector('.player-counter .count'),
    _playerCount: 0,
    setPlayerCount: function setPlayerCount(gameData) {
      if (this._playerCount !== gameData.playerCount) {
        this.$playerCount.textContent = gameData.playerCount;
        this._playerCount = gameData.playerCount;
      }
    },
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
    game.setPlayerCount(data.game);
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

    players.self.update({ x: x, y: y }, true);
    socket.emit('move', { x: x, y: y });
  });

  socket.on('connected', onConnected);
  socket.on('player disconnected', onPlayerDisconnected);
}());
