(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.GameController = (function() {
    function _Class(iFrameElement, playerId) {
      var adjustSizeOfIFrame, m, patch, _i, _len, _ref,
        _this = this;
      this.iFrameElement = iFrameElement;
      this.playerId = playerId;
      this.triggerEvent = __bind(this.triggerEvent, this);
      this.addPlayerWithId = __bind(this.addPlayerWithId, this);
      this.removePlayerWithId = __bind(this.removePlayerWithId, this);
      this.onOtherPlayerRemove = __bind(this.onOtherPlayerRemove, this);
      this.onOtherPlayerAdd = __bind(this.onOtherPlayerAdd, this);
      this.onOtherMouseMove = __bind(this.onOtherMouseMove, this);
      this.onOwnMouseMove = __bind(this.onOwnMouseMove, this);
      this.onMouseMove = __bind(this.onMouseMove, this);
      this.onTriggerEvent = __bind(this.onTriggerEvent, this);
      this.hypeDoc = this.iFrameElement.contentWindow.hypeDocument();
      this.overlayElement = this.iFrameElement.contentDocument.body;
      this.originalHypeDocMethods = {};
      this.playerId = this.playerId;
      this.otherPlayers = {};
      $(this.iFrameElement.contentWindow).mousemove(function(e) {
        _this.onOwnMouseMove({
          playerId: _this.playerId,
          eventName: "mouseMove",
          args: [e.pageX, e.pageY]
        });
        return _this.onTriggerEvent({
          playerId: _this.playerId,
          eventName: "mouseMove",
          args: [e.pageX, e.pageY]
        });
      });
      patch = function(methodName) {
        _this.originalHypeDocMethods[methodName] = _this.hypeDoc[methodName];
        return _this.hypeDoc[methodName] = function() {
          return _this.onTriggerEvent({
            playerId: _this.playerId,
            eventName: methodName,
            args: arguments
          });
        };
      };
      _ref = ["startTimelineNamed", "pauseTimelineNamed", "continueTimelineNamed", "goToTimeInTimelineNamed", "showSceneNamed"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        patch(m);
      }
      this.hypeDoc["showSceneNamed"] = function(name) {
        _this.onTriggerEvent({
          playerId: _this.playerId,
          eventName: "enterState",
          args: [name]
        });
        return _this.originalHypeDocMethods["showSceneNamed"](name);
      };
      adjustSizeOfIFrame = function() {
        var f, transform;
        f = Math.min($(window).width() / 1280, $(window).height() / 720);
        transform = "scale(" + f + ", " + f + ") translate(" + 0 + "px,-" + 0 + "px)";
        _this.iFrameElement.style["-webkit-transform"] = transform;
        return _this.iFrameElement.style["transform"] = transform;
      };
      $(window).resize(adjustSizeOfIFrame);
      adjustSizeOfIFrame();
    }

    _Class.prototype.onTriggerEvent = function(gameEvent) {};

    _Class.prototype.onMouseMove = function(gameEvent) {
      if (gameEvent.playerId !== this.playerId) {
        return this.onOtherMouseMove(gameEvent);
      }
    };

    _Class.prototype.onOwnMouseMove = function(gameEvent) {};

    _Class.prototype.onOtherMouseMove = function(gameEvent) {};

    _Class.prototype.onOtherPlayerAdd = function(player) {};

    _Class.prototype.onOtherPlayerRemove = function(player) {};

    _Class.prototype.removePlayerWithId = function(playerId) {
      var p;
      p = this.otherPlayers[playerId];
      if (p != null) {
        this.onOtherPlayerRemove(p);
        return delete this.otherPlayers[playerId];
      } else {
        throw "no player with id '" + playerId + "' to delete";
      }
    };

    _Class.prototype.addPlayerWithId = function(playerId) {
      var otherPlayer;
      otherPlayer = {
        playerId: playerId
      };
      this.otherPlayers[playerId] = otherPlayer;
      return this.onOtherPlayerAdd(otherPlayer);
    };

    _Class.prototype.triggerEvent = function(gameEvent) {
      switch (gameEvent.eventName) {
        case "mouseMove":
          return this.onMouseMove(gameEvent);
        case "enterState":
          if (gameEvent.args[0] === "level" && gameEvent.playerId === this.playerId) {
            return this.originalHypeDocMethods["showSceneNamed"].apply(this.hypeDoc, gameEvent.args);
          }
          break;
        default:
          return this.originalHypeDocMethods[gameEvent.eventName].apply(this.hypeDoc, _.map(gameEvent.args, _.identity));
      }
    };

    return _Class;

  })();

}).call(this);
