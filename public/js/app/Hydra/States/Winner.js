define(['Hydra/Socket/Client'], function (client) {
    //@todo: load this from galaxy JSON, as this is currently hard-coded
    var WORLD_WIDTH = 2560;
    var WORLD_HEIGHT = 2560;

    return {
        create: function (game) {
            game = game;
            game.stage.bg.width = 200;
            game.stage.bg.height = 200;
            game.stage.setBackgroundColor(0x000000);

            game.stage.bg = bg;

            if (game.winner && game.winner.name) {
                var textContent = 'Congratulations! The winner is: ' + game.winner.name + '!!!';

                _textLabel = game.add.text(300, 240, textContent, {
                    font: "24px Arial",
                    fill: "#00ffa8"
                });
            }
        }
    };
});