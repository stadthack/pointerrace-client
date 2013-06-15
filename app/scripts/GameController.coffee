@GameController = class
  constructor: (@iFrameElement, @playerId) ->
    @hypeDoc = @iFrameElement.contentWindow.hypeDocument()
    @overlayElement = @iFrameElement.contentDocument.body
    @originalHypeDocMethods = {}
    @playerId = @playerId
    @otherPlayers = {}

    $(@iFrameElement.contentWindow).mousemove (e) =>
      @onOwnMouseMove
        playerId: @playerId
        eventName: "mouseMove"
        args: [e.pageX, e.pageY]

      @onTriggerEvent
        playerId: @playerId
        eventName: "mouseMove"
        args: [e.pageX, e.pageY]

    patch = (methodName) =>
      @originalHypeDocMethods[methodName] = @hypeDoc[methodName]
      @hypeDoc[methodName] = () =>
        @onTriggerEvent
          playerId: @playerId
          eventName: methodName
          args: arguments

    for m in ["startTimelineNamed", "pauseTimelineNamed", "continueTimelineNamed", "goToTimeInTimelineNamed",
              "showSceneNamed"]
      patch(m)

    @hypeDoc["showSceneNamed"] = (name) =>
      @onTriggerEvent
        playerId: @playerId
        eventName: "enterState"
        args: [name]

  onTriggerEvent: (gameEvent) =>
    console.log "triggered", gameEvent

  onMouseMove: (gameEvent) =>
    console.log('MouseMove:', gameEvent)
    unless gameEvent.playerId == @playerId
      @onOtherMouseMove(gameEvent)

  onOwnMouseMove: (gameEvent) =>

  onOtherMouseMove: (gameEvent) =>

  onOtherPlayerAdd: (player) =>

  onOtherPlayerRemove:(player) =>

  removePlayerWithId: (playerId) =>
    p = @otherPlayers[playerId]
    if p?
      @onOtherPlayerRemove(p)
      delete @otherPlayers[playerId]
    else
      throw "no player with id '#{playerId}' to delete"

  addPlayerWithId: (playerId) =>
    otherPlayer = {playerId: playerId}
    @otherPlayers[playerId] = otherPlayer
    @onOtherPlayerAdd otherPlayer

  triggerEvent: (gameEvent) =>
    switch gameEvent.eventName
      when "mouseMove" then @onMouseMove(gameEvent)
      when "enterState" and gameEvent.args[0] == "level" and gameEvent.playerId == @playerId
        @originalHypeDocMethods[gameEvent.eventName].apply(@hypeDoc, gameEvent.args)
      else
        @originalHypeDocMethods[gameEvent.eventName].apply(@hypeDoc, _.map(gameEvent.args, _.identity))
