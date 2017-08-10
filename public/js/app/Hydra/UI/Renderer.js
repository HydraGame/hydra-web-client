define(['Hydra/Socket/Client'], function (client) {
    var _game = null;
    var _galaxy = null;
    var _serverPlanets = [];
    var _initialized = false;

    /**
     * Render entire galaxy data every few milliseconds
     * Data contains:
     * - Galaxy name: Andromeda
     * - width: 1000
     * - height: 1000
     * - gameSpeed: 30
     * - gameDuration: 86400
     * - list of planets
     *
     * Each planet data item contains:
     * - name: Earth
     * - population: 1250
     * - size: medium (not used)
     * - position: {x: 500, y: 600}
     */
    var _addMessageCallback = function () {
        client.addMessageCallback(function (e) {
            data = JSON.parse(e.data);

            if (data.error) {
                return;
            }

            if (data.username) {
                _game.player = data;
            }

            if (data.winner && data.winner.name) {
                _game.winner = data.winner;
                _game.state.start('Winner');
                return;
            }
            if (data.planets) {
                _serverPlanets = JSON.parse(e.data).planets;
                _game.currentPlayerPlanets = [];

                for (var i = 0; i < _serverPlanets.length; i++) {
                    var gPlanet = _serverPlanets[i];

                    if (gPlanet.player !== undefined && gPlanet.player.name === _game.player.username) {
                        _game.currentPlayerPlanets.push(gPlanet);
                    }
                }

                _createInitialPlanets();
                _renderPlanets();
            }
        });
    };

    var _createInitialPlanets = function () {
        _galaxy.children = [];

        if (!_galaxy.children.length) {
            for (var i = 0; i < _serverPlanets.length; i++) {
                _createClientPlanet(_serverPlanets[i]);
            }
        }
    };

    var _createClientPlanet = function (serverPlanet) {
        var player = serverPlanet.player;
        var fleet = serverPlanet.fleet;
        serverPlanet = serverPlanet.planet;
        var planet = _game.add.image(serverPlanet.position.x, serverPlanet.position.y, 'planet-green');
        planet.name = serverPlanet.name;

        var slugify = function(text) {
          return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
        };

        if (player && fleet) {
            if (player !== undefined && player.name === _game.player.username) {
                for (i = 0; i < fleet.squads.length; i++) {
                    var squad = fleet.squads[i];
                    var yPos = serverPlanet.position.y - (20 * (i + 1)
                    );

                    for (j = 0; j < squad.count; j++) {
                        var xPos = serverPlanet.position.x + j * 20;
                        var gameShip = _game.add.image(xPos, yPos, slugify(squad.ship.name));

                        _galaxy.addChild(gameShip);
                    }
                }
            }

        }

        _galaxy.addChild(planet);
    };

    var _renderPlanets = function () {
        _galaxy.forEach(function (clientPlanet) {
            for (var j = 0; j < _serverPlanets.length; j++) {
                if (_serverPlanets[j].planet.name === clientPlanet.name) {
                    _renderPlanet(clientPlanet, _serverPlanets[j]);

                    break;
                }
            }
        });
    };

    var _renderPlanet = function (clientPlanet, serverPlanet) {
        var usernameText = '';
        var populationText = '';

        if (serverPlanet.player) {
            usernameText = ' <' + serverPlanet.player.name + '> ';
        }

        planet = serverPlanet.planet;

        if (serverPlanet.player !== undefined && serverPlanet.player.name === _game.player.username) {
            populationText = ' [' + planet.population + ']'
        }

        var color = "#ffffff";

        if (serverPlanet.player !== undefined) {
            if (serverPlanet.player.name === _game.player.username) {
                color = "#3fef06";
            } else {
                color = "#f07373";
            }
        }

        if (clientPlanet.children.length && clientPlanet.children[0].text) {
            clientPlanet.children[0].text = planet.name + usernameText + populationText;

            clientPlanet.children[0].style.fill = color;
        } else {
            var textLabel = _game.add.text(10, 10, planet.name + usernameText + populationText, {
                font: "12px Arial",
                fill: color
            });

            clientPlanet.name = planet.name;
            clientPlanet.inputEnabled = true;
            clientPlanet.input.useHandCursor = true;

            textLabel.x = ((clientPlanet.width + textLabel.width) / 2) - textLabel.width;
            textLabel.y = clientPlanet.height + 2;

            clientPlanet.events.onInputDown.add(function (e) {
                _game._selectedPlanet = serverPlanet;
                _game.state.start('PlanetView');
            });

            clientPlanet.addChild(textLabel);
        }
    };

    return {
        init: function (game) {
            _game = game;
            _galaxy = _game.add.group();

            _addMessageCallback();
            _initialized = true;
        },
    };
});

