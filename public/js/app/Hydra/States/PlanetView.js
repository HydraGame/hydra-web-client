define(['Hydra/Socket/Client'], function (client) {
    var _textLabel = null;

    return {
        create: function (game) {
            game.stage.bg.width = 200;
            game.stage.bg.height = 200;
            game.stage.setBackgroundColor(0x000);

            var planet = game._selectedPlanet.planet;
            var planetPlayer = game._selectedPlanet.player;
            var myPlanet = planetPlayer != undefined && planetPlayer.name == game.player.username;
            var textContent = 'Planet name: ' + planet.name + ' \n';

            game.add.text(
                300,
                50,
                "Commands",
                {font: "16px Arial", fill: "#ffffff", align: "center"}
            );
            var back = game.add.text(
                300,
                70,
                "Back to Galaxy",
                {font: "16px Arial", fill: "#ffff00", align: "center"}
            );

            back.inputEnabled = true;
            back.events.onInputDown.add(function () {
                game.state.start('Game');
            }, this);

            if (myPlanet) {
                textContent += 'Population: ' + planet.population + '\n';
                textContent += 'Gold: ' + planet.gold + '\n';
            } else {
                var attack = game.add.text(
                    300,
                    90,
                    "Attack!",
                    {font: "16px Arial", fill: "#ff0044", align: "center"}
                );

                attack.inputEnabled = true;
                attack.events.onInputDown.add(function () {
                    client.getConnection().send(
                        "attack"
                    );
                    game.state.start('Game');
                }, this);
            }

            _textLabel = game.add.text(50, 50, textContent, {
                font: "16px Arial",
                fill: "#fff"
            });
        },
        update: function (game) {
            var planet = game._selectedPlanet.planet;
            var planetPlayer = game._selectedPlanet.player;
            var myPlanet = planetPlayer != undefined && planetPlayer.name == game.player.username;
            var textContent = 'Planet name: ' + planet.name + ' \n';

            if (myPlanet) {
                textContent += 'Population: ' + planet.population + '\n';
                textContent += 'Gold: ' + planet.gold + '\n';
            }

            _textLabel.text = textContent;
        },
        renderBuildingsText: function () {
            var text = '';

            if (game._selectedPlanet.buildings) {
                text += 'Count buildings: ' + game._selectedPlanet.buildings.length + '\n';

                for (var i = 0; i < game._selectedPlanet.buildings.length; i++) {
                    text += 'Building name: ' + game._selectedPlanet.buildings[i].name;
                    text += ' (time remaining ' + game._selectedPlanet.buildings[i].buildTimeRemaining + ' of ' + game._selectedPlanet.buildings[i].buildTime + ')\n';
                }
            } else {
                text += 'Count buildings: ' + 0 + '\n';
            }

            return text;
        },
        renderShipsText: function () {
            var text = '';

            if (game._selectedPlanet.ships) {
                text += 'Count ships: ' + game._selectedPlanet.ships.length + '\n';

                for (var i = 0; i < game._selectedPlanet.ships.length; i++) {
                    text += 'Ship: ' + game._selectedPlanet.ships[i].name + '\n';
                    text += ' (time remaining ' + game._selectedPlanet.ships[i].buildTimeRemaining + ' of ' + game._selectedPlanet.ships[i].buildTime + ')\n';
                }
            } else {
                text += 'Count ships: ' + 0 + '\n';
            }

            return text;
        }
    };
});