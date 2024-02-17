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
    var ypos = 20; // y-pos of sprite 2

    var rain_x = 6; // x-pos of rain
    var rain_y = -5; // y-pos of rain
    var rain2_x = 12; // x-pos of rain
    var rain2_y = -21; // y-pos of rain

    const _RAINALPHA = 180;

    const _CD = 0x353535; // dark grey
    const _CC = 0x5E5E5E; // medium grey
    const _CB = 0x7C7C7C; // light grey
    const _CA = 0xA3A3A3; // lighter grey

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
            PS.color(PS.ALL, PS.ALL, _CB); PS.color(PS.ALL, 0, _CD);
            PS.color(PS.ALL, 1, _CD); PS.color(4, 1, _CC); PS.color(5, 1, _CC); PS.color(10, 1, _CC); PS.color(11, 1, _CC); PS.color(12, 1, _CC);
            PS.color(PS.ALL, 2, _CD); PS.color(6, 2, _CC); PS.color(7, 2, _CC); PS.color(8, 2, _CC); PS.color(9, 2, _CC); PS.color(10, 2, _CC);
            PS.color(11, 2, _CB); PS.color(12, 2, _CB); PS.color(27, 2, _CC); PS.color(28, 2, _CC);
            PS.color(PS.ALL, 3, _CD); PS.color(0, 3, _CC); PS.color(8, 3, _CC); PS.color(9, 3, _CB); PS.color(10, 3, _CB); PS.color(11, 3, _CB); PS.color(15, 3, _CC); PS.color(16, 3, _CC);
            PS.color(20, 3, _CC); PS.color(21, 3, _CC); PS.color(22, 3, _CC); PS.color(28, 3, _CC); PS.color(29, 3, _CC);
            PS.color(PS.ALL, 4, _CC); PS.color(3, 4, _CD); PS.color(4, 4, _CD); PS.color(5, 4, _CD); PS.color(6, 4, _CD); PS.color(7, 4, _CD); PS.color(8, 4, _CD); PS.color(9, 4, _CD); PS.color(10, 4, _CD); PS.color(11, 4, _CD); PS.color(12, 4, _CD); PS.color(13, 4, _CD);
            PS.color(14, 4, _CB); PS.color(15, 4, _CC); PS.color(16, 4, _CD); PS.color(17, 4, _CD); PS.color(26, 4, _CD); PS.color(27, 4, _CD);
            PS.color(PS.ALL, 5, _CC); PS.color(0, 5, _CD); PS.color(1, 5, _CD); PS.color(2, 5, _CB); PS.color(3, 5, _CB); PS.color(4, 5, _CB); PS.color(5, 5, _CB);
            PS.color(6, 5, _CD); PS.color(7, 5, _CD); PS.color(8, 5, _CD); PS.color(9, 5, _CD); PS.color(10, 5, _CD); PS.color(11, 5, _CD); PS.color(12, 5, _CD); PS.color(13, 5, _CD); PS.color(14, 5, _CD); PS.color(15, 5, _CD); PS.color(16, 5, _CD); PS.color(29, 5, _CB);
            PS.color(PS.ALL, 6, _CC); PS.color(0, 6, _CD); PS.color(1, 6, _CD); PS.color(2, 6, _CD); PS.color(3, 6, _CD); PS.color(4, 6, _CD); PS.color(5, 6, _CD); PS.color(6, 6, _CD); PS.color(7, 6, _CD); PS.color(8, 6, _CD); PS.color(9, 6, _CD); PS.color(10, 6, _CD); PS.color(13, 6, _CD); PS.color(14, 6, _CD);
            PS.color(20, 6, _CB); PS.color(21, 6, _CB); PS.color(22, 6, _CB); PS.color(28, 6, _CB); PS.color(29, 6, _CB); PS.color(30, 6, _CB);
            PS.color(PS.ALL, 7, _CC); PS.color(0, 7, _CD); PS.color(1, 7, _CD); PS.color(2, 7, _CD); PS.color(3, 7, _CD); PS.color(4, 7, _CD); PS.color(5, 7, _CD); PS.color(6, 7, _CD); PS.color(7, 7, _CD); PS.color(8, 7, _CD);
            PS.color(19, 7, _CB); PS.color(20, 7, _CB); PS.color(21, 7, _CA); PS.color(22, 7, _CA); PS.color(23, 7, _CA); PS.color(24, 7, _CB); PS.color(27, 7, _CB); PS.color(28, 7, _CB); PS.color(29, 7, _CA); PS.color(30, 7, _CA);
            PS.color(PS.ALL, 8, _CC); PS.color(1, 8, _CD); PS.color(2, 8, _CD); PS.color(3, 8, _CD); PS.color(13, 8, _CD); PS.color(14, 8, _CD); PS.color(15, 8, _CD); PS.color(16, 8, _CD);
            PS.color(24, 8, _CA); PS.color(25, 8, _CA); PS.color(26, 8, _CA); PS.color(27, 8, _CA); PS.color(28, 8, _CA); PS.color(29, 8, _CA); PS.color(30, 8, _CA);
            PS.color(PS.ALL, 9, _CC); PS.color(6, 9, _CB); PS.color(7, 9, _CB); PS.color(8, 9, _CB); PS.color(9, 9, _CB); PS.color(12, 9, _CD); PS.color(13, 9, _CD); PS.color(14, 9, _CD); PS.color(15, 9, _CD); PS.color(16, 9, _CD); PS.color(17, 9, _CD); PS.color(18, 9, _CD); PS.color(19, 9, _CD); PS.color(20, 9, _CD); PS.color(21, 9, _CD); PS.color(22, 9, _CD);
            PS.color(27, 9, _CD); PS.color(28, 9, _CD); PS.color(29, 9, _CD); PS.color(PS.ALL, 10, _CD);
            PS.color(0, 10, _CC); PS.color(1, 10, _CC); PS.color(2, 10, _CC); PS.color(3, 10, _CC); PS.color(4, 10, _CB); PS.color(5, 10, _CB); PS.color(6, 10, _CB); PS.color(7, 10, _CB); PS.color(8, 10, _CB); PS.color(21, 10, _CC); PS.color(22, 10, _CC); PS.color(23, 10, _CC); PS.color(24, 10, _CC);
            PS.color(PS.ALL, 11, _CD); PS.color(0, 11, _CC); PS.color(1, 11, _CC); PS.color(2, 11, _CA); PS.color(3, 11, _CC); PS.color(4, 11, _CC); PS.color(5, 11, _CC); PS.color(6, 11, _CC); PS.color(7, 11, _CB); PS.color(8, 11, _CB); PS.color(9, 11, _CB); PS.color(10, 11, _CB); PS.color(11, 11, _CB); PS.color(12, 11, _CB);
            PS.color(18, 11, _CB); PS.color(19, 11, _CB); PS.color(20, 11, _CC); PS.color(21, 11, _CC); PS.color(22, 11, _CC); PS.color(23, 11, _CC);
            PS.color(PS.ALL, 12, _CC); PS.color(1, 12, _CA); PS.color(11, 12, _CB); PS.color(12, 12, _CB); PS.color(13, 12, _CA); PS.color(14, 12, _CA); PS.color(15, 12, _CA);
            PS.color(16, 12, _CB); PS.color(17, 12, _CB); PS.color(26, 12, _CD); PS.color(27, 12, _CD); PS.color(28, 12, _CD); PS.color(29, 12, _CD);
            PS.color(PS.ALL, 13, _CC); PS.color(1, 13, _CA); PS.color(2, 13, _CB); PS.color(16, 13, _CA); PS.color(21, 13, _CA); PS.color(27, 13, _CD); PS.color(28, 13, _CD);
            PS.color(PS.ALL, 14, _CC); PS.color(0, 14, _CA); PS.color(1, 14, _CA); PS.color(2, 14, _CB); PS.color(3, 14, _CB); PS.color(12, 14, _CB); PS.color(13, 14, _CB);  PS.color(14, 14, _CB); PS.color(15, 14, _CB); PS.color(16, 14, _CB); PS.color(17, 14, _CA); PS.color(18, 14, _CA); PS.color(19, 14, _CA); PS.color(20, 14, _CA); PS.color(27, 14, _CD);
            PS.color(2, 15, _CA); PS.color(3, 15, _CA); PS.color(6, 15, _CC); PS.color(7, 15, _CC); PS.color(8, 15, _CA); PS.color(19, 15, _CA); PS.color(20, 15, _CC); PS.color(21, 15, _CC); PS.color(22, 15, _CC); PS.color(23, 15, _CC); PS.color(24, 15, _CC); PS.color(25, 15, _CC); PS.color(26, 15, _CC); PS.color(27, 15, _CD); PS.color(29, 15, _CC); PS.color(30, 15, _CC);
            PS.color(4, 16, _CA); PS.color(5, 16, _CA); PS.color(6, 16, _CA); PS.color(7, 16, _CA); PS.color(20, 16, _CA); PS.color(21, 16, _CA); PS.color(24, 16, _CC); PS.color(25, 16, _CC); PS.color(26, 16, _CA);
            PS.color(22, 17, _CA); PS.color(23, 17, _CA); PS.color(24, 17, _CA); PS.color(25, 17, _CA);
            PS.color(PS.ALL, 29, _CC);
            PS.color(PS.ALL, 30, _CC);
            PS.color(PS.ALL, 31, _CC);

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

            // load player with image sprite
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
            if (rain_y > 28) {
                // if rain is untouched, damage
                if (PS.spriteSolidAlpha(idRain) > 0) {
                    G.damage();
                }
                rain_y = -5;
                rain_x = G.randomizeX();
                PS.spriteSolidAlpha(idRain, _RAINALPHA);
            }
            if (rain2_y > 28) {
                // if rain is untouched, damage
                if (PS.spriteSolidAlpha(idRain2) > 0) {
                    G.damage();
                }
                rain2_y = -5;
                rain2_x = G.randomizeX();
                PS.spriteSolidAlpha(idRain2, _RAINALPHA);
            }
            PS.spriteMove(idRain, rain_x, rain_y);
            PS.spriteMove(idRain2, rain2_x, rain2_y);
        },

        damage : function() {
            if ((this._play) && (_totalHealth>1))
                PS.audioPlay("fx_bloink");
            _totalHealth--;
            if (_totalHealth < 1) {
                G.gameOver();
            }
        },

        quicken : function(v) {
            if (v > 2)
                v = v-1;
            return v;
        },

        randomizeX : function() {
            let val = PS.random(26)+1;
            return val;
        },

        gameOver() {
            if (this._play)
                PS.audioPlay("fx_scratch");
            G._play = false;
        },

        startGame() {
            G._play = true;
            let rain_x = this.randomizeX();
            let rain_drop_distance = 2;
            let rain_speed = 6;
            let rainTimer = PS.timerStart(rain_speed, function() {
                G.rainfall(rain_x, rain_drop_distance);
            });
            let currTimer = rainTimer;
            PS.timerStart(840, function() {
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
    PS.statusText("When It Rains");
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