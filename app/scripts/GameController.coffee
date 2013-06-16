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

    # do not propagate change (back) to level
    # initial start will be announced from server in @triggerEvent()
    @hypeDoc["showSceneNamed"] = (name, optTime) =>
      @onTriggerEvent
        playerId: @playerId
        eventName: "enterState"
        args: [name, optTime]

      @originalHypeDocMethods["showSceneNamed"](name) unless name == "level"

    # do not propagate changes in Main Timeline
    @hypeDoc["goToTimeInTimelineNamed"] = (time, name) =>
      if name != "Main Timeline"
        @onTriggerEvent
          playerId: @playerId
          eventName: "goToTimeInTimelineNamed"
          args: [time, name]

      @originalHypeDocMethods["goToTimeInTimelineNamed"](time, name)


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
        console.log(gameEvent)
        if gameEvent.args[0] == "level" and gameEvent.playerId == @playerId
          @originalHypeDocMethods["showSceneNamed"].apply(@hypeDoc, [gameEvent.args[0]])
          if gameEvent.args[1]?
            console.log "going to time", gameEvent.args[1]
            @originalHypeDocMethods["goToTimeInTimelineNamed"].apply(@hypeDoc, [gameEvent.args[1], "Main Timeline"])
      when "loadNextLevel" 
        console.log("Loading next level", gameEvent.args['numLevel'])
        callback = -> window.location.reload()
        setTimeout callback, 2500
      when "goToTimeInTimelineNamed", "startTimelineNamed"
        # only playing game (screne=="level") requires syncing
        if @hypeDoc.currentSceneName() == "level"
          @originalHypeDocMethods[gameEvent.eventName].apply(@hypeDoc, gameEvent.args)
      else
        @originalHypeDocMethods[gameEvent.eventName].apply(@hypeDoc, gameEvent.args)
