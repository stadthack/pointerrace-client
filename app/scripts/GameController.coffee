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

      @originalHypeDocMethods["showSceneNamed"](name) unless name == "level"

    adjustSizeOfIFrame = () =>
      f = Math.min($(window).width() / 1280, $(window).height() / 720)

      transform = "scale(#{f}, #{f}) translate(#{0}px,-#{0}px)"
      @iFrameElement.style["-webkit-transform"] = transform
      @iFrameElement.style["transform"] = transform

    $(window).resize adjustSizeOfIFrame
    adjustSizeOfIFrame()

  onTriggerEvent: (gameEvent) =>

  onMouseMove: (gameEvent) =>
    unless gameEvent.playerId == @playerId
      @onOtherMouseMove(gameEvent)

  onOwnMouseMove: (gameEvent) =>

  onOtherMouseMove: (gameEvent) =>

  onOtherPlayerAdd: (player) =>

  onOtherPlayerRemove: (player) =>

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
      when "enterState"
        if gameEvent.args[0] == "level" and gameEvent.playerId == @playerId
          @originalHypeDocMethods["showSceneNamed"].apply(@hypeDoc, gameEvent.args)
      else
        @originalHypeDocMethods[gameEvent.eventName].apply(@hypeDoc, _.map(gameEvent.args, _.identity))
