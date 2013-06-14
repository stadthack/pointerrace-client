(function () {
  var genUUID = function genUUID() {
    var i, random, uuid = '';

    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if ( i === 8 || i === 12 || i === 16 || i === 20 ) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }

    return uuid;
  };

  var socket = io.connect('http://localhost:8080');
  var player = {
    uuid: genUUID(),
    x: 0.0,
    y: 0.0
  };
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  document.addEventListener('mousemove', function (event) {
    player.x = (event.pageX / document.width * 100).toFixed(2);
    player.y = (event.pageY / document.height * 100).toFixed(2);
    socket.emit('move', player);
  });

  socket.emit('connect', player);

  socket.on('players-move', function (players) {
    renderCanvas(ctx, players);
    console.log('players: ', players);
  });

  function renderCanvas(ctx, players) {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(200, 0, 0)';

    for (var key in players) {
      var player = players[key];
      ctx.fillRect(player.x, player.y, 5, 5);
    }
  }
}());
