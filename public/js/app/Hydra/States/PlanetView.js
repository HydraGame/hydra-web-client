define(['Hydra/Socket/Client'], function (client) {
    var _game = null;
    var _textLabel = null;

    return {
        create: function (game) {
            _game = game;
            _game.stage.bg.width = 200;
            _game.stage.bg.height = 200;
            _game.stage.setBackgroundColor(0x000);

            _game.add.button(400, 5, 'build-starport', function () {
                client.getConnection().send(
                    JSON.stringify({
                        command: 'buildBuilding',
                        galaxyName: 'Andromeda',
                        planetName: _game._selectedPlanet.name
                    })
                );
            });

            _game.add.button(450, 55, 'back-to-galaxy', function () {
                _game.state.start('Game');
            });

            _game.add.button(400, 105, 'build-starport', function () {
                client.getConnection().send(
                    JSON.stringify({
                        command: 'buildShip',
                        galaxyName: 'Andromeda',
                        planetName: _game._selectedPlanet.name
                    })
                );
            });


            var text = game.add.text(
                400,
                205,
                "Colonize planet",
                {font: "25px Arial", fill: "#ff0044", align: "center"}
            );

            text.inputEnabled = true;
            text.events.onInputDown.add(function () {
                client.getConnection().send(
                    JSON.stringify({
                        command: 'colonizePlanet',
                        galaxyName: 'Andromeda',
                        username: _game.player.username,
                        planetName: _game._selectedPlanet.name
                    })
                );
                _game.state.start('Game');
            }, this);

            var textContent = 'Planet name: ' + _game._selectedPlanet.name + ' \n';
            textContent += 'Population: ' + _game._selectedPlanet.population + '\n';
            textContent += 'Gold: ' + _game._selectedPlanet.gold + '\n';
            textContent += 'Crystal: ' + _game._selectedPlanet.crystal + '\n';
            textContent += this.renderBuildingsText();
            textContent += this.renderShipsText();

            _textLabel = _game.add.text(50, 50, textContent, {
                font: "18px Arial",
                fill: "#fff"
            });
        },
        update: function () {
            var textContent = 'Planet name: ' + _game._selectedPlanet.name + ' \n';
            textContent += 'Population: ' + _game._selectedPlanet.population + '\n';
            textContent += 'Gold: ' + _game._selectedPlanet.gold + '\n';
            textContent += 'Crystal: ' + _game._selectedPlanet.crystal + '\n';
            textContent += this.renderBuildingsText();
            textContent += this.renderShipsText();

            _textLabel.text = textContent;
        },
        renderBuildingsText: function () {
            var text = '';

            if (_game._selectedPlanet.buildings) {
                text += 'Count buildings: ' + _game._selectedPlanet.buildings.length + '\n';

                for (var i = 0; i < _game._selectedPlanet.buildings.length; i++) {
                    text += 'Building name: ' + _game._selectedPlanet.buildings[i].name;
                    text += ' (time remaining ' + _game._selectedPlanet.buildings[i].buildTimeRemaining + ' of ' + _game._selectedPlanet.buildings[i].buildTime + ')\n';
                }
            } else {
                text += 'Count buildings: ' + 0 + '\n';
            }

            return text;
        },
        renderShipsText: function () {
            var text = '';

            if (_game._selectedPlanet.ships) {
                text += 'Count ships: ' + _game._selectedPlanet.ships.length + '\n';

                for (var i = 0; i < _game._selectedPlanet.ships.length; i++) {
                    text += 'Ship: ' + _game._selectedPlanet.ships[i].name + '\n';
                    text += ' (time remaining ' + _game._selectedPlanet.ships[i].buildTimeRemaining + ' of ' + _game._selectedPlanet.ships[i].buildTime + ')\n';
                }
            } else {
                text += 'Count ships: ' + 0 + '\n';
            }

            return text;
        }
    };
});