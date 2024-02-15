// Rain by William Smith
// Made with Perlenspiel 3.3
// February 2024

"use strict";

var G; // establish game namespace

( function () {
    var idRain; // rain sprite 1 identifier
    var idRain2; // rain sprite 2 identifier
    var idPlayer; // player sprite identifier
    var xpos = 6; // x-pos of sprite 2
    var ypos = 19; // y-pos of sprite 2

    var rain_x = 6; // x-pos of rain
    var rain_y = -4; // y-pos of rain
    var rain2_x = 12; // x-pos of rain
    var rain2_y = -20; // y-pos of rain

    const _RAINALPHA = 180;

    var floorPlane = 0;
    var s1Plane = 1;
    var s2Plane = 2;
    var playerPlane = 3;

    let _max_x = 23;

    let _totalHealth = 3;

    G = {
        width : 31, // width of grid
        height : 32, // height of grid

        _play : true,

        // Draw floor and initialize sprite
        drawMap : function () {
            var loader, reporter1, reporter2;

            PS.gridPlane(floorPlane);
            // define the background art
            PS.color(PS.ALL, PS.ALL, 0x858585); PS.color(PS.ALL, 0, 0x353535);
            PS.color(PS.ALL, 1, 0x353535); PS.color(4, 1, 0x646464); PS.color(5, 1, 0x646464); PS.color(10, 1, 0x646464); PS.color(11, 1, 0x646464); PS.color(12, 1, 0x646464);
            PS.color(PS.ALL, 2, 0x353535); PS.color(0, 2, 0x646464); PS.color(1, 2, 0x646464);
            PS.color(6, 2, 0x646464); PS.color(7, 2, 0x646464); PS.color(8, 2, 0x646464); PS.color(9, 2, 0x646464); PS.color(10, 2, 0x646464);
            PS.color(11, 2, 0x858585); PS.color(12, 2, 0x858585); PS.color(21, 2, 0x646464); PS.color(27, 2, 0x646464); PS.color(28, 2, 0x646464);
            PS.color(PS.ALL, 3, 0x353535); PS.color(0, 3, 0x646464); PS.color(1, 3, 0x646464); PS.color(8, 3, 0x646464); PS.color(9, 3, 0x858585); PS.color(10, 3, 0x858585); PS.color(11, 3, 0x858585); PS.color(14, 3, 0x858585);
            PS.color(15, 3, 0x646464); PS.color(16, 3, 0x646464); PS.color(19, 3, 0x646464); PS.color(20, 3, 0x646464); PS.color(21, 3, 0x646464); PS.color(22, 3, 0x646464); PS.color(28, 3, 0x646464); PS.color(29, 3, 0x646464);

            // Create rain sprites
            // Place on plane 1 on top of grid
            idRain = PS.spriteSolid(1, 3);
            PS.spriteSolidColor(idRain, 0x6390E3);
            PS.spriteSolidAlpha(idRain, _RAINALPHA);
            PS.spritePlane(idRain, s1Plane);
            PS.spriteMove(idRain, rain_x, rain_y);

            idRain2 = PS.spriteSolid(1, 3);
            PS.spriteSolidColor(idRain2, 0x6390E3);
            PS.spriteSolidAlpha(idRain2, _RAINALPHA);
            PS.spritePlane(idRain2, s2Plane);
            PS.spriteMove(idRain2, rain_x, rain2_y);


            loader = function (data) {
                idPlayer = PS.spriteImage(data);
                PS.spritePlane(idPlayer, playerPlane);
                PS.spriteMove(idPlayer, xpos, ypos);
            };
            PS.imageLoad("rainguymini.png", loader);

            // Create 9x11 solid green sprite
            // Place on plane 3 at bottom of grid
            // idPlayer = PS.spriteSolid(9, 11);
            // PS.spriteSolidColor(idPlayer, PS.COLOR_GREEN);
            // PS.spritePlane(idPlayer, playerPlane);
            // PS.spriteMove(idPlayer, xpos, ypos);

            // Assign collision function to player
            reporter1 = function (s1, p1, s2, p2, type) {
                if (type === PS.SPRITE_TOUCH) {
                    type = "touch"
                } else {
                    type = "overlap";
                }
                // if rain hits the player, rain disappears
                if (type === "overlap") {
                    PS.spriteSolidAlpha(idRain, 0);
                }
            };
            reporter2 = function (s1, p1, s2, p2, type) {
                if (type === PS.SPRITE_TOUCH) {
                    type = "touch"
                }
                else {
                    type = "overlap";
                }
                // if rain hits the player, rain disappears
                if (type === "overlap") {
                    PS.spriteSolidAlpha(idRain2, 0);
                }
            }
            PS.spriteCollide(idRain, reporter1);
            PS.spriteCollide(idRain2, reporter2);
        },

        // Move sprite relative to current position
        move : function (x) {
            if(G._play === false) {
                return;
            }
            let nx = xpos + x;
            // If move is off grid, return
            if ((nx < 0) || (nx > _max_x)) {
                return;
            }
            xpos = nx;
            PS.spriteMove(idPlayer, xpos, ypos);
        },

        rainfall : function (x, y) {
            rain_y = rain_y + y;
            rain2_y = rain2_y + y;

            // check if rain reaches bottom
            if (rain_y > 29) {
                // if rain is untouched, damage
                if (PS.spriteSolidAlpha(idRain) > 0) {
                    G.damage();
                }
                rain_y = -4;
                rain_x = G.randomizeX();
                PS.spriteSolidAlpha(idRain, _RAINALPHA);
            }
            if (rain2_y > 29) {
                // if rain is untouched, damage
                if (PS.spriteSolidAlpha(idRain2) > 0) {
                    G.damage();
                }
                rain2_y = -4;
                rain2_x = G.randomizeX();
                PS.spriteSolidAlpha(idRain2, _RAINALPHA);
            }
            PS.spriteMove(idRain, rain_x, rain_y);
            PS.spriteMove(idRain2, rain2_x, rain2_y);
        },

        damage : function() {
            PS.debug("oh no\n");
            _totalHealth--;
            if (_totalHealth < 1) {
                G.gameOver();
            }
        },

        quicken : function(v) {
            PS.debug(v+"\n");
            if (v > 2) {
                v = v-1;
            }
            return v;
        },

        randomizeX : function() {
            let val = PS.random(26)+1;
            return val;
        },

        gameOver() {
            PS.debug("game over man\n");
            G._play = false;
        },

        startGame() {
            G._play = true;
            let rain_x = this.randomizeX();
            let rain_drop_distance = 2;
            let rain_speed = 8;
            let rainTimer = PS.timerStart(rain_speed, function() {
                G.rainfall(rain_x, rain_drop_distance);
            });
            let currTimer = rainTimer;
            PS.timerStart(600, function() {
                PS.timerStop(currTimer);
                rain_speed = G.quicken(rain_speed);
                let fasterTimer = PS.timerStart(rain_speed, function() {
                    G.rainfall(rain_x, rain_drop_distance);
                });
                currTimer = fasterTimer;
            })
        }
    };
}() );

PS.init = function() {
    PS.gridSize(G.width, G.height); // init grid
    PS.border(PS.ALL, PS.ALL, 0); // no borders
    G.drawMap();
    PS.statusText("Rain");
    G.startGame();
};

PS.keyDown = function(key) {
    switch (key) {
        case PS.KEY_ARROW_LEFT:
        case 97: // lower-case a
        case 65: // upper-case A
        {
            G.move(-5);
            break;
        }
        case PS.KEY_ARROW_RIGHT:
        case 100: // lower-case d
        case 68: // upper-case D
        {
            G.move(5);
            break;
        }
    }
};