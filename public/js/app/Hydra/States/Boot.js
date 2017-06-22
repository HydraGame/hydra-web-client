define(['Hydra/Socket/Client'], function (client) {
    var _game = null;

    var BootState = function (game) {
        _game = game;
    };

    BootState.prototype = {
        constructor: BootState,
        create: function () {
            client.init();

            _game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            _game.scale.pageAlignHorizontally = true;
            _game.scale.pageAlignVertically = true;
            _game.state.start('Preloader');
        }
    };

    return BootState;
});
