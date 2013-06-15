@GameController = class
  constructor: (@iFrameElement) ->
    @hypeDoc = @iFrameElement.contentWindow.hypeDocument()
    @originalHypeDocMethods = {}
    @playerId = "unknown player " + Math.round(Math.random() * 10000)

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

    for m in ["startTimelineNamed", "pauseTimelineNamed", "continueTimelineNamed", "showSceneNamed"]
      patch(m)

  onTriggerEvent: (gameEvent) =>
    console.log "triggered", gameEvent

  onMouseMoved: (gameEvent) =>
    if gameEvent.playerId == @playerId
      @onOwnMouseMoved(gameEvent)
    else
      @onOtherMouseMoved(gameEvent)

  onOwnMouseMoved: (gameEvent) =>

  onOtherMouseMoved: (gameEvent) =>
    console.log "other played moved", gameEvent

  triggerEvent: (gameEvent) =>
    switch gameEvent.eventName
      when "mouseMove" then @onMouseMoved(gameEvent)
      else
        @originalHypeDocMethods[gameEvent.eventName].apply(@hypeDoc, gameEvent.args)
