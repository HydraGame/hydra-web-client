define(['Hydra/Socket/Client'], function (client) {
    var _game = null;
    var _textLabel = null;
    //@todo: load this from galaxy JSON, as this is currently hard-coded
    var WORLD_WIDTH = 2560;
    var WORLD_HEIGHT = 2560;

    return {
        create: function (game) {
            bg = game.add.tileSprite(0, 0, WORLD_WIDTH, WORLD_HEIGHT, 'background');
            bg.fixedToCamera = true;

            if (typeof game.stage.bg !== 'undefined') {
                game.camera.x = game.stage.bg.x;
                game.camera.y = game.stage.bg.y;
            }

            game.stage.bg = bg;

            game.add.text(
                400,
                200,
                "Who are you?",
                { font: "20px Arial", fill: "#ffffff", align: "center" }
            );

            var p1 = game.add.text(
                400,
                240,
                "Ubick",
                { font: "20px Arial", fill: "#ffff00", align: "center" }
            );

            var p2 = game.add.text(
                400,
                280,
                "LordTheCrow",
                { font: "20px Arial", fill: "#ff8800", align: "center" }
            );

            var p3 = game.add.text(
                400,
                320,
                "ChocolateLover",
                { font: "20px Arial", fill: "#ff4400", align: "center" }
            );

            var p4 = game.add.text(
                400,
                360,
                "Tudor = bananalover",
                { font: "20px Arial", fill: "#00ff00", align: "center" }
            );

            var players = [p1, p2, p3, p4];

            for (var i = 0; i < players.length; i++) {
                var p = players[i];
                p.inputEnabled = true;
                p.events.onInputDown.add(function (element) {
                    game.player = { username: element.text };
                    game.state.start('Game');
                }, this);
            }
        }
    };
});