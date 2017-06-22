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

            if (game.player && game.player.username) {
                game.debug.text('Username: ' + game.player.username, 20, 40, '#FCCF00');
            }
        }
    };
});
