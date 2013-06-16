/*global _, io, StateMachine, GameController */
(function () {
  'use strict';

  var socketHost = typeof(window) === "undefined" ? "localhost" : window.location.host;
  var socket = io.connect('http://' + socketHost + ':8080');
  var PlayerState = function () {
    this.startup();
  };
  var levels = [
    'hype/GreenLevel.html',
    'hype/TestLevel.html'
  ];
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

  function PlayerPointer(isSelf) {
    this.isSelf = isSelf;

    this.$el = document.createElement('div');
    this.$el.className = isSelf ? 'pointer pointer-self' : 'pointer';

    gameInstance.overlayElement.appendChild(this.$el);
  }

  PlayerPointer.prototype.move = function move(x, y) {
    var transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
    this.$el.style['-webkit-transform'] = transform;
    this.$el.style.transform = transform;
  };

  PlayerPointer.prototype.remove = function remove() {
    this.$el.parentElement.removeChild(this.$el);
  };

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
    console.log('Let\'s play level', data.numLevel);

    var $iframe = document.querySelector('.game-level');
    $iframe.addEventListener('load', function (e) {
      // iframe was loaded, now wait for hype
      e.srcElement.contentWindow.afterHypeLoaded(afterHypeLoaded);
    });
    $iframe.src = levels[data.numLevel % levels.length];

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
    if (data.eventName !== 'mouseMove') {
      console.log('Got event:', data);
    }
    gameInstance.triggerEvent(data);
  }

  playerBuffer.init();
  socket.on('connected', onConnected);

  function afterHypeLoaded () {
    gameInstance = new GameController(document.querySelector('.game-level'), player.id);
    player.pointer = new PlayerPointer(true);

    // local loop-back
    gameInstance.onTriggerEvent = function (event) {
      // TODO: Replace me
      // This is inefficient and should probably be replaced with either a count
      // down latch-ish synchronization primitive or two promises, so we can
      // depend on the playerId to be set. Since this is triggered on every
      // event, optimizing here is probably a good idea.
      if (!gameInstance.playerId) {
        gameInstance.playerId = player.id;
      }

      if (event.eventName !== 'mouseMove') {
        console.log('Emitting', event.eventName);
      }
      socket.emit('game event', event);
    };

    gameInstance.onOtherMouseMove = function onOtherMouseMove(event) {
      var pointer = gameInstance.otherPlayers[event.playerId].pointer;
      pointer.move(event.args[0], event.args[1]);
    };

    gameInstance.onOwnMouseMove = function onOwnMouseMove(event) {
      player.pointer.move(event.args[0], event.args[1]);
    };

    gameInstance.onOtherPlayerAdd = function onOtherPlayerAdd(player) {
      console.log('Added other player', player.playerId);

      player.pointer = new PlayerPointer(false);
    };

    gameInstance.onOtherPlayerRemove = function (data) {
      console.log('Removing player', data.playerId);

      var player = gameInstance.otherPlayers[data.playerId];

      if (player) {
        player.pointer.remove();
        delete gameInstance.otherPlayers[data.playerId];
      }
    };

    playerBuffer.apply();
    socket.on('player connected', onPlayerConnected);
    socket.on('player disconnected', onPlayerDisconnected);
    socket.on('game event', onGameEvent);
  }
}());
