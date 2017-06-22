define(['Hydra/Socket/Client'], function (client) {
    var _game = null;
    var _textLabel = null;

    return {
        create: function (game) {
            _game = game;
            _game.stage.bg.width = 200;
            _game.stage.bg.height = 200;
            _game.stage.setBackgroundColor(0x00ffa8);


            if (_game.winner && game.winner.username) {
                var textContent = 'Congratulations! The winner is: ' + _game.winner.username + '!!!';

                _textLabel = _game.add.text(50, 50, textContent, {
                    font: "24px Arial",
                    fill: "#001910"
                });
            }


        }
    };
});