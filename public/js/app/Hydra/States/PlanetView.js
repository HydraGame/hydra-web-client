define(['Hydra/Socket/Client'], function (client) {
    var _textLabel = null;

    return {
        create: function (game) {
            game.stage.bg.width = 200;
            game.stage.bg.height = 200;
            game.stage.setBackgroundColor(0x000);

            var planet = game._selectedPlanet.planet;
            var planetPlayer = game._selectedPlanet.player;
            var myPlanet = planetPlayer !== undefined && planetPlayer.name === game.player.username;
            var textContent = 'Planet name: ' + planet.name + ' \n';

            game.add.text(
                300,
                50,
                "Commands",
                {font: "16px Arial", fill: "#ffffff", align: "center"}
            );
            var back = game.add.text(
                300,
                80,
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
                var attackingTextHeight = 100;

                for (var i = 0; i < game.currentPlayerPlanets.length; i++) {
                    var currentPlanet = game.currentPlayerPlanets[i];

                    if (currentPlanet.fleet === undefined ||
                        currentPlanet.fleet.squads === undefined ||
                        !currentPlanet.fleet.squads.length) {
                        continue;
                    }

                    var currentPlanetName = currentPlanet.planet.name;

                    var attack = game.add.text(
                        300,
                        attackingTextHeight,
                        "Attack from planet " + currentPlanetName,
                        {font: "16px Arial", fill: "#ff0044", align: "center"}
                    );

                    attackingTextHeight += 20;

                    attack.inputEnabled = true;
                    attack.events.onInputDown.add(function () {
                        var command = {
                            attackingPlanetName: currentPlanetName,
                            attackedPlanetName: planet.name
                        };

                        console.log(command)
                        client.getConnection().send(
                            JSON.stringify(command)
                        );
                        game.state.start('Game');
                    }, this);
                }
            }

            _textLabel = game.add.text(50, 50, textContent, {
                font: "16px Arial",
                fill: "#fff"
            });
        },
        update: function (game) {
            var planet = game._selectedPlanet.planet;
            var planetPlayer = game._selectedPlanet.player;
            var myPlanet = planetPlayer !== undefined && planetPlayer.name === game.player.username;
            var textContent = 'Planet name: ' + planet.name + ' \n';

            if (myPlanet) {
                textContent += 'Population: ' + planet.population + '\n';
                textContent += 'Gold: ' + planet.gold + '\n';
            }

            _textLabel.text = textContent;
        }
    };
});