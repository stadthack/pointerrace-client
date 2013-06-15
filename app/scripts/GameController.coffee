@GameController = class
  constructor: (@iFrameElement) ->
    @hypeDoc = @iFrameElement.contentWindow.hypeDocument()
    @overlayElement = @iFrameElement.contentDocument.body
    @originalHypeDocMethods = {}
    @playerId = "unknown player " + Math.round(Math.random() * 10000)
    @otherPlayers = {}

    $(@iFrameElement.contentWindow).mousemove (e) =>
      @onTriggerEvent
        playerId: @playerId
        eventName: "mouseMove"
        args: arguments

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

  onTriggerEvent: (gameEvent) =>
#    console.log "triggered", gameEvent

  onMouseMove: (gameEvent) =>
    if gameEvent.playerId == @playerId
      @onOwnMouseMove(gameEvent)
    else
      @onOtherMouseMove(gameEvent)

  onOwnMouseMove: (gameEvent) =>

  onOtherMouseMove: (gameEvent) =>
#    console.log "other played move", gameEvent

  onOtherPlayerAdd: (player) =>
    console.log "other player add", gameEvent

  onOtherPlayerRemove:(player) =>
    console.log "other player remove", gameEvent

  removePlayerWithId: (playerId) =>
    p = @otherPlayers[playerId]
    if p?
      @onOtherPlayerRemove(p)
      delete @otherPlayers[playerId]
    else
      throw "no player with id '#{playerId}' to delete"

  addOtherPlayerIfNeeded: (playerId) =>
    if playerId != @playerId and not @otherPlayers[playerId]
      otherPlayer = {playerId: playerId}
      @otherPlayers[playerId] = otherPlayer
      @onOtherPlayerAdd otherPlayer

  triggerEvent: (gameEvent) =>
    @addOtherPlayerIfNeeded(gameEvent.playerId)
    switch gameEvent.eventName
      when "mouseMove" then @onMouseMove(gameEvent)
      else
        @originalHypeDocMethods[gameEvent.eventName].apply(@hypeDoc, gameEvent.args)
