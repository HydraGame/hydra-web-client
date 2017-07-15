define(['Hydra/UI/KeyboardCameraNavigator'], function (keyboardCameraNavigator) {
    //@todo: load this from galaxy JSON, as this is currently hard-coded
    var WORLD_WIDTH = 2560;
    var WORLD_HEIGHT = 2560;

    var _game = null;

    var _preloadAssets = function () {
        _game.load.image('background', 'img/starfield.jpg');
        _game.load.image('planet', 'img/planet-16x16.png');
        _game.load.image('planet-green', 'img/planet-green-16x16.png');
        _game.load.image('planet-gold', 'img/planet-gold-16x16.png');
        _game.load.image('planet-blue', 'img/planet-blue-16x16.png');
        _game.load.image('colony-ship', 'img/colony-ship-16x16.png');
        _game.load.image('battle-cruiser', 'img/battle-cruiser-16x16.png');
        _game.load.spritesheet('generate-galaxy', 'img/buttons/button-generate-galaxy.png', 123, 22);
        _game.load.spritesheet('back-to-galaxy', 'img/buttons/btn-back-to-galaxy.png', 130, 47);
        _game.load.spritesheet('build-starport', 'img/buttons/button-build-starport.png', 178, 40);
    };

    var _preloadWorld = function () {
        _game.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    };

    var _initFpsCounter = function() {
        _game.time.advancedTiming = true;
    };

    return {
        preload: function (game) {
            _game = game;
            _preloadWorld();
            _preloadAssets();
            _initFpsCounter();
        },
        create: function (game) {
            keyboardCameraNavigator.init(game.camera, game.input.keyboard);

            game.state.start('Login');
        }
    };
});

