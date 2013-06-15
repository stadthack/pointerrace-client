@GameController = class
  constructor: (@iFrameElement, @playerId) ->
    @hypeDoc = @iFrameElement.contentWindow.hypeDocument()
    @overlayElement = @iFrameElement.contentDocument.body
    @originalHypeDocMethods = {}
    @playerId = @playerId
    @otherPlayers = {}

    $(@iFrameElement.contentWindow).mousemove (e) =>
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

  onTriggerEvent: (gameEvent) =>
    console.log "triggered", gameEvent

  onMouseMove: (gameEvent) =>
    console.log('MouseMove:', gameEvent)
    if gameEvent.playerId == @playerId
      @onOwnMouseMove(gameEvent)
    else
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
      else
        @originalHypeDocMethods[gameEvent.eventName].apply(@hypeDoc, gameEvent.args)
