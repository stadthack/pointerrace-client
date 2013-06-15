/*global _, io, StateMachine, GameController */
(function () {
  'use strict';

  var socket = io.connect('http://localhost:8080');
  var PlayerState = function () {
    this.startup();
  };
  var gameInstance = null;
  var playerBuffer = {
    _players: [],
    _onConnected: null,
    _onDisconnected: null,
    _applied: false,
    init: function init() {
      this._onConnected = this.onConnected.bind(this);
      this._onDisconnected = this.onDisconnected.bind(this);

      socket.on('player connected', this._onConnected);
      socket.on('player disconnected', this._onDisconnected);
    },
    onConnected: function onConnect(data) {
      this._players.push(data.id);
      if (this._applied) {
        this.apply();
      }
    },
    onDisconnected: function onDisconnect(data) {
      this._players.splice(this._player.indexOf(data.id), 1);
    },
    apply: function apply() {
      _.map(this._players, gameInstance.addPlayerWithId, gameInstance);
      this._players = [];
      if (!this._applied) {
        this._removeListener();
        this._applied = true;
      }
    },
    _removeListener: function _removeListener() {
      socket.removeListener('player connected', this._onConnected);
      socket.removeListener('player disconnected', this._onDisconnected);
    }
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
    this.state = new PlayerState();
  }

  var player = new Player();

  var game = {
    $playerCount: document.querySelector('.player-counter .count'),
    loaded: false,
    _playerCount: 0,
    setPlayerCount: function setPlayerCount(gameData) {
      if (this._playerCount !== gameData.playerCount) {
        this.$playerCount.textContent = gameData.playerCount;
        this._playerCount = gameData.playerCount;
      }
    }
  };

  function onServerstate(data) {
    game.setPlayerCount(data.game);
  }

  function onConnected(data) {
    player.id = data.id;
    player.state.connect();

    console.log('Player state:', player.state.current);
    console.log('We are player', data.id);

    console.log(data);
    _.map(data.players, playerBuffer.onConnected, playerBuffer);
    // Don't work with server state before player initialization has happened.
    socket.on('serverstate', onServerstate);
  }

  function onPlayerDisconnected(data) {
    console.log('Player', data.id, 'disconnected.');

    gameInstance.removePlayerWithId(data.id);
  }

  function onPlayerConnected(data) {
    console.log('Player', data.id, 'connected.');

    gameInstance.addPlayerWithId(data.id);
  }

  function onGameEvent(data) {
    console.log('Got event:', data.eventName);
    gameInstance.triggerEvent(data);
  }

  playerBuffer.init();
  socket.on('connected', onConnected);

  function afterHypeLoaded () {
    gameInstance = new GameController(document.querySelector('.game-level'), player.id);

    // local loop-back
    gameInstance.onTriggerEvent = function (event) {
      gameInstance.triggerEvent(event);

      console.log('Emitting', event.eventName);
      socket.emit('game event', event);
    };

    gameInstance.onOtherMouseMove = function (event) {
      var pointer = gameInstance.otherPlayers[event.playerId].pointer;
      var transform = 'translate3d(' + event.args[0] + 'px, ' + event.args[1] + 'px, 0)';

      pointer.style['-webkit-transform'] = transform;
      pointer.style.transform = transform;
    };

    gameInstance.onOtherPlayerAdd = function (player) {
      console.log('Added other player', player.playerId);

      var pointer = document.createElement('div');
      pointer.className = 'pointer';
      player.pointer = pointer;
      gameInstance.overlayElement.appendChild(pointer);
    };

    gameInstance.onOtherPlayerRemove = function (player) {
      console.log('Removing player', player.playerId);

      var pointer = gameInstance.otherPlayers[player.playerId].pointer;
      pointer.remove();
    };

    playerBuffer.apply();
    socket.on('player connected', onPlayerConnected);
    socket.on('player disconnected', onPlayerDisconnected);
    socket.on('game event', onGameEvent);
  }

  document.querySelector('.game-level').addEventListener('load', function (e) {
    // iframe was loaded, now wait for hype
    e.srcElement.contentWindow.afterHypeLoaded(afterHypeLoaded);
  });
}());
