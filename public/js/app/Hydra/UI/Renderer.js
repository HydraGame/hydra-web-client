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
     *
     * This onmessage method will eventually handle all
     * communication between server / client
     */
    var _addMessageCallback = function () {
        client.addMessageCallback(function (e) {
            // @todo - parse data exception and render error
            data = JSON.parse(e.data);

            if (data.username) {
                _game.player = data;
            }

            if (data.winner && data.winner.username) {
                _game.winner = data.winner;
                _game.state.start('Winner');
                return;
            }
            if (data.planets) {
                _serverPlanets = JSON.parse(e.data).planets;
                _createInitialPlanets();
                _updateSelectedPlanet();
                _renderPlanets();
            }
        });
    };

    var _updateSelectedPlanet = function () {
        if (_game._selectedPlanet) {
            for (var k = 0; k < _serverPlanets.length; k++) {
                if (_game._selectedPlanet.name == _serverPlanets[k].name) {
                    _game._selectedPlanet = _serverPlanets[k];
                    break;
                }
            }
        }
    };

    var _createInitialPlanets = function () {
        if (!_galaxy.children.length) {
            for (var i = 0; i < _serverPlanets.length; i++) {
                _createClientPlanet(_serverPlanets[i]);
            }
        }
    };

    var _createClientPlanet = function (serverPlanet) {
        var planet = _game.add.image(serverPlanet.position.x, serverPlanet.position.y, 'planet-green');
        planet.name = serverPlanet.name;

        if (serverPlanet.player && serverPlanet.player.fleet) {
            var ship = _game.add.image(serverPlanet.position.x, serverPlanet.position.y - 20, 'colony-ship');
            _galaxy.addChild(ship);
        }

        _galaxy.addChild(planet);
    };

    var _renderPlanets = function () {
        _galaxy.forEach(function (clientPlanet) {
            for (var j = 0; j < _serverPlanets.length; j++) {
                if (_serverPlanets[j].name == clientPlanet.name) {
                    _renderPlanet(clientPlanet, _serverPlanets[j]);

                    break;
                }
            }
        });
    };

    var _renderPlanet = function (clientPlanet, serverPlanet) {
        var usernameText = '';

        if (serverPlanet.player) {
            usernameText = ' <' + serverPlanet.player.username + '> ';
        }

        if (clientPlanet.children.length && clientPlanet.children[0].text) {
            clientPlanet.children[0].text = serverPlanet.name + usernameText + ' [' + serverPlanet.population + ']';
        } else {
            var textLabel = _game.add.text(10, 10, serverPlanet.name + usernameText +  ' [' + serverPlanet.population + ']', {
                font: "12px Arial",
                fill: "#fff"
            });

            clientPlanet.name = serverPlanet.name;
            clientPlanet.inputEnabled = true;
            clientPlanet.input.useHandCursor = true;

            textLabel.x = ((clientPlanet.width + textLabel.width) / 2) - textLabel.width;
            textLabel.y = clientPlanet.height + 2;

            clientPlanet.events.onInputOver.add(function () {
                textLabel.text += '\n[x: ' + serverPlanet.position.x + ', y: ' + serverPlanet.position.y + ']';
                textLabel.text += '\n[population: ' + serverPlanet.population + ']';
            });

            clientPlanet.events.onInputOut.add(function () {
                textLabel.text = serverPlanet.name + ' [' + serverPlanet.population + ']';
            });

            clientPlanet.events.onInputDown.add(function () {
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
        }
    };
});

