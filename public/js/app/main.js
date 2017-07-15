define(function (require) {
    var VIEWPORT_WIDTH = 960;
    var VIEWPORT_HEIGHT = 640;

    var boot = require('Hydra/States/Boot');
    var preloader = require('Hydra/States/Preloader');
    var login = require('Hydra/States/Login');
    var hydraGame = require('Hydra/States/Game');
    var planetView = require('Hydra/States/PlanetView');
    var winner = require('Hydra/States/Winner');

    var game = new Phaser.Game(VIEWPORT_WIDTH, VIEWPORT_HEIGHT, Phaser.AUTO, 'game');
    game.state.add('Boot', boot);
    game.state.add('Preloader', preloader);
    game.state.add('Login', login);
    game.state.add('Game', hydraGame);
    game.state.add('PlanetView', planetView);
    game.state.add('Winner', winner);

    game.state.start('Boot');
});