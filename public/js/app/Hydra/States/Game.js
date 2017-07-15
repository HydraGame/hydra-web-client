define(['Hydra/UI/KeyboardCameraNavigator', 'Hydra/UI/Renderer'], function (keyboardCameraNavigator, renderer) {
    var WORLD_WIDTH = 960;
    var WORLD_HEIGHT = 640;

    var _bg = null;

    return {
        create: function (game) {
            _bg = game.add.tileSprite(0, 0, WORLD_WIDTH, WORLD_HEIGHT, 'background');
            _bg.fixedToCamera = true;

            if (typeof game.stage.bg !== 'undefined') {
                game.camera.x = game.stage.bg.x;
                game.camera.y = game.stage.bg.y;
            }

            game.stage.bg = _bg;

            if (game.player != undefined && game.player.username) {
                game.add.text(
                    20,
                    30,
                    'Username: ' + game.player.username,
                    {font: "16px Arial", fill: "#ffff00", align: "center"}
                );

                var logout = game.add.text(
                    WORLD_WIDTH - 150,
                    30,
                    "[ Logout ]",
                    {font: "16px Arial", fill: "#ccff77", align: "center"}
                );

                logout.inputEnabled = true;
                logout.events.onInputDown.add(function (element) {
                    game.player = null

                    game.state.start('Login');
                }, this);
            }

            renderer.init(game);
        },

        /**
         * Make the background look like it's sticking to the planets
         */
        update: function (game) {
            keyboardCameraNavigator.update();

            game.stage.bg.tilePosition.x = -game.camera.x;
            game.stage.bg.tilePosition.y = -game.camera.y;
        },
        render: function(game) {
            game.debug.text('FPS: ' + game.time.fps, 20, 20, '#FFFF00');
        }
    };
});
