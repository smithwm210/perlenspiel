// Rain by William Smith
// Made with Perlenspiel 3.3
// February 2024

"use strict";

var G; // establish game namespace

( function () {
    var idRain; // rain sprite 1 identifier
    var idRain2; // rain sprite 2 identifier
    var idPlayer; // player sprite identifier
    var idRainSplashL; // left rain splash sprite identifier
    var idRainSplashR; // right rain splash sprite identifier
    var idScoreCard; // score card sprite identifier
    var idRetryBox; // retry button sprite identifier
    var xpos = 11; // x-pos of player
    var ypos = 20; // y-pos of player

    var rain_speed= 6; // time between rainfall calls

    var rain_x = 14; // x-pos of rain
    var rain_y = -5; // y-pos of rain
    var rain2_x = 17; // x-pos of rain
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
    var splashPlane = 4;
    var scorePlane = 5;
    var retryPlane = 6;

    let _max_x = 23;

    let _totalHealth = 3;

    G = {
        width : 31, // width of grid
        height : 32, // height of grid

        _play : true,
        _retry : false,

        globalTimer : null,

        curScore : 0,
        highScore : 0,

        topS : {top: 5, left: 5, bottom: 2},
        botS : {top: 2, right: 5, bottom: 5},
        topC : {top: 5, left: 5},
        botC : {left: 5, bottom: 5},
        topO : {top: 5, left: 5, right: 5},
        botO : {left: 5, right: 5, bottom: 5},
        topR : {top: 5, left: 5, right: 5, bottom: 2},
        botR : {top: 2, left: 5, right: 2},
        extR : {left: 2},
        topE : {top: 5, left: 5, bottom: 2},
        botE : {top: 2, left: 5, bottom: 5},
        topleftH : {right: 5},
        topmidH : {left: 1, right: 1, bottom: 2},
        toprightH : {left: 5},
        botleftH : {right: 5},
        botmidH : {top: 2, left: 1, right: 1},
        botrightH : {left: 5},
        topleftI : {top: 5, right: 3},
        toprightI : {top: 5, left: 3},
        botleftI : {right: 3, bottom: 5},
        botrightI : {left: 3, bottom: 5},
        top1 : {right: 5},
        top2 : {top: 5, right: 5, bottom: 2},
        bot2 : {top: 2, left: 5, bottom: 5},
        top3 : {top: 5, right: 5, bottom: 2},
        bot3 : {top: 2, right: 5, bottom: 5},
        top4 : {left: 5, right: 5, bottom: 2},
        bot4 : {top: 2, right: 5},
        top5 : {top: 5, left: 5, bottom: 2},
        bot5 : {top: 2, right: 5, bottom: 5},
        top6 : {left: 5, bottom: 2},
        bot6 : {top: 2, left: 5, right: 5, bottom: 5},
        top7 : {top: 5, right: 5},
        bot7 : {right: 5},
        top8 : {top: 5, left: 5, right: 5, bottom: 2},
        bot8 : {top: 2, left: 5, right: 5, bottom: 5},
        top9 : {top: 5, left: 5, right: 5, bottom: 2},
        bot9 : {top: 2, right: 5},
        ret10 : {bottom: 5},
        ret01 : {right: 5},
        ret21 : {left: 5},
        ret12 : {top: 5},

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

            // Create rain splash
            idRainSplashL = PS.spriteSolid(1, 1);
            PS.spriteSolidColor(idRainSplashL, 0x6390E3)
            PS.spriteSolidAlpha(idRainSplashL, _RAINALPHA);
            PS.spritePlane(idRainSplashL, splashPlane);
            PS.spriteMove(idRainSplashL, 31, 0);
            idRainSplashR = PS.spriteSolid(1, 1);
            PS.spriteSolidColor(idRainSplashR, 0x6390E3)
            PS.spriteSolidAlpha(idRainSplashR, _RAINALPHA);
            PS.spritePlane(idRainSplashR, splashPlane);
            PS.spriteMove(idRainSplashR, 31, 1);

            // Create game over scorecard
            idScoreCard = PS.spriteSolid(23, 20);
            PS.spriteSolidColor(idScoreCard, PS.COLOR_GRAY_DARK);
            PS.spriteSolidAlpha(idScoreCard, 150);
            PS.spritePlane(idScoreCard, scorePlane);
            PS.spriteMove(idScoreCard, 31, 4);

            // Create retry button
            idRetryBox = PS.spriteSolid(5, 3);
            PS.spriteSolidColor(idRetryBox, PS.COLOR_GRAY_LIGHT);
            PS.spritePlane(idRetryBox, retryPlane);
            PS.spriteMove(idRetryBox, 31, 18);

            // Assign collision function to player
            reporter1 = function (s1, p1, s2, p2, type) {
                // ignore collision with scoreCard
                if ((p2 < 4) && (PS.spriteSolidAlpha(idRain) !== 0)) {
                    if (type === PS.SPRITE_TOUCH) {
                        type = "touch"
                    } else {
                        type = "overlap";
                    }
                    // if rain hits the player, rain disappears
                    if (type === "overlap") {
                        PS.audioPlay("fx_drip2", {
                            volume: 0.3
                        });
                        G.splash(rain_x, rain_y);
                        if (G._play) {
                            PS.audioPlay("perc_drum_bass");
                            G.curScore = G.updateScore(G.curScore);
                            PS.statusText("When it Rains | Score: "+G.curScore);
                        }
                        PS.spriteSolidAlpha(idRain, 0);
                    }
                }
            };
            reporter2 = function (s1, p1, s2, p2, type) {
                // ignore collision with scoreCard
                if ((p2 < 4) && (PS.spriteSolidAlpha(idRain2) !== 0)) {
                    if (type === PS.SPRITE_TOUCH) {
                        type = "touch"
                    } else {
                        type = "overlap";
                    }
                    // if rain hits the player, rain disappears
                    if (type === "overlap") {
                        PS.audioPlay("fx_drip2", {
                            volume: 0.3
                        });
                        G.splash(rain2_x, rain2_y);
                        if (G._play) {
                            PS.audioPlay("perc_drum_snare");
                            G.curScore = G.updateScore(G.curScore);
                            PS.statusText("When it Rains | Score: "+G.curScore);
                        }
                        PS.spriteSolidAlpha(idRain2, 0);
                    }
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
                    G.splash(rain_x, rain_y);
                    G.damage();
                }
                rain_y = -5;
                rain_x = G.randomizeX();
                PS.spriteSolidAlpha(idRain, _RAINALPHA);
            }
            if (rain2_y > 28) {
                // if rain is untouched, damage
                if (PS.spriteSolidAlpha(idRain2) > 0) {
                    G.splash(rain2_x, rain2_y);
                    G.damage();
                }
                rain2_y = -5;
                rain2_x = G.randomizeX();
                PS.spriteSolidAlpha(idRain2, _RAINALPHA);
            }
            PS.spriteMove(idRain, rain_x, rain_y);
            PS.spriteMove(idRain2, rain2_x, rain2_y);
        },

        splash : function(x, y) {
            let acc = 0;
            let lx = x; // left drop horiz pos
            let rx = x; // right drop horiz pos
            let ny = y; // drops vert pos
            let splashAnimator = PS.timerStart(4, function() {
                PS.spriteMove(idRainSplashL, lx, ny);
                PS.spriteMove(idRainSplashR, rx, ny);
                acc++;
                lx = x - acc;
                rx = x + acc;
                switch (acc) {
                    case(1):
                        ny = y - 1;
                        break;
                    case(2):
                        ny = y - 2;
                        break;
                    case(3):
                        break;
                    case(4):
                        ny = y - 1;
                        break;
                    default:
                        break;
                }

                if (acc > 5) {
                    PS.spriteMove(idRainSplashL, 31, 0);
                    PS.spriteMove(idRainSplashR, 31, 1);
                    PS.timerStop(splashAnimator);
                }
            });
        },

        damage : function() {
            if ((this._play) && (_totalHealth > 1)) {
                PS.audioPlay("fx_bloink");

                PS.color(PS.ALL, 29, PS.COLOR_WHITE);
                PS.color(PS.ALL, 30, PS.COLOR_WHITE);
                PS.color(PS.ALL, 31, PS.COLOR_WHITE);
                let dmgTimer = PS.timerStart(8, function() {
                    PS.color(PS.ALL, 29, _CC);
                    PS.color(PS.ALL, 30, _CC);
                    PS.color(PS.ALL, 31, _CC);
                    PS.timerStop(dmgTimer);
                });
            }

            _totalHealth--;

            if ((this._play) && (_totalHealth < 1)) {
                PS.color(PS.ALL, 29, PS.COLOR_WHITE);
                PS.color(PS.ALL, 30, PS.COLOR_WHITE);
                PS.color(PS.ALL, 31, PS.COLOR_WHITE);
                let dmgTimer = PS.timerStart(6, function() {
                    PS.color(PS.ALL, 29, _CC);
                    PS.color(PS.ALL, 30, _CC);
                    PS.color(PS.ALL, 31, _CC);
                    PS.timerStop(dmgTimer);
                });
                G.gameOver();
            }

            if (this.play !== false) {
                PS.audioPlay("fx_drip2", {
                    volume: 0.3
                });
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

        updateScore : function(val) {
            val += 1;
            return val;
        },

        decConverter : function(input) {
            let hundreds = 0;
            let tens = 0;
            let ones = 0;
            let count = input;

            while (count >= 100) {
                hundreds++;
                count -= 100;
            }
            while (count >= 10) {
                tens++;
                count -= 10;
            }
            while (count >= 1) {
                ones++;
                count -= 1;
            }

            let decArray = [0, 0, 0];
            decArray[0] = hundreds;
            decArray[1] = tens;
            decArray[2] = ones;

            return decArray;
        },

        numSetter : function(place, x, y, bool) {
            if (bool) {
                PS.borderColor(x, y, PS.COLOR_YELLOW);
                PS.borderColor(x, y + 1, PS.COLOR_YELLOW);
            }
            switch(place) {
                case 0:
                {
                    PS.border(x, y, G.topO);
                    PS.border(x, y + 1, G.botO);
                    break;
                }
                case 1:
                {
                    PS.border(x, y, G.top1);
                    PS.border(x, y + 1, G.top1);
                    break;
                }
                case 2:
                {
                    PS.border(x, y, G.top2);
                    PS.border(x, y + 1, G.bot2);
                    break;
                }
                case 3:
                {
                    PS.border(x, y, G.top3);
                    PS.border(x, y + 1, G.bot3);
                    break;
                }
                case 4:
                {
                    PS.border(x, y, G.top4);
                    PS.border(x, y + 1, G.bot4);
                    break;
                }
                case 5:
                {
                    PS.border(x, y, G.top5);
                    PS.border(x, y + 1, G.bot5);
                    break;
                }
                case 6:
                {
                    PS.border(x, y, G.top6);
                    PS.border(x, y + 1, G.bot6);
                    break;
                }
                case 7:
                {
                    PS.border(x, y, G.top7);
                    PS.border(x, y + 1, G.bot7);
                    break;
                }
                case 8:
                {
                    PS.border(x, y, G.top8);
                    PS.border(x, y + 1, G.bot8);
                    break;
                }
                case 9:
                {
                    PS.border(x, y, G.top9);
                    PS.border(x, y + 1, G.bot9);
                    break;
                }
                default:
                {
                    break;
                }
            }
        },

        gameOver() {
            PS.audioPlay("fx_scratch");
            G._play = false;
            let newHi = false;
            if (G.curScore > G.highScore) {
                G.highScore = G.curScore;
                newHi = true;
            }

            // load game over popup
            PS.spriteMove(idScoreCard, 4, 4);
            // load retry button
            PS.spriteMove(idRetryBox, 13, 18);

            let scoreArray = this.decConverter(G.curScore);
            let hun = scoreArray[0];
            let ten = scoreArray[1];
            let one = scoreArray[2];
            let hiArray = this.decConverter(G.highScore);
            let hiHun = hiArray[0];
            let hiTen = hiArray[1];
            let hiOne = hiArray[2];
            PS.glyphColor(PS.ALL, PS.ALL, PS.COLOR_WHITE);

            PS.borderColor(PS.ALL, PS.ALL, PS.COLOR_WHITE);
            PS.border(7, 8, G.topS);
            PS.border(7, 9, G.botS);
            PS.border(9, 8, G.topC);
            PS.border(9, 9, G.botC);
            PS.border(11, 8, G.topO);
            PS.border(11, 9, G.botO);
            PS.border(13, 8, G.topR);
            PS.border(13, 9, G.botR);
            PS.border(14, 9, G.extR);
            PS.border(15, 8, G.topE);
            PS.border(15, 9, G.botE);

            PS.border(11, 13, G.topleftH);
            PS.border(12, 13, G.topmidH);
            PS.border(13, 13, G.toprightH);
            PS.border(11, 14, G.botleftH);
            PS.border(12, 14, G.botmidH);
            PS.border(13, 14, G.botrightH);
            PS.border(14, 13, G.topleftI);
            PS.border(15, 13, G.toprightI);
            PS.border(14, 14, G.botleftI);
            PS.border(15, 14, G.botrightI);

            this.numSetter(hun, 19, 8, newHi);
            this.numSetter(ten, 21, 8, newHi);
            this.numSetter(one, 23, 8, newHi);
            this.numSetter(hiHun, 19, 13, newHi);
            this.numSetter(hiTen, 21, 13, newHi);
            this.numSetter(hiOne, 23, 13, newHi);

            // Retry button
            PS.borderColor(PS.ALL, 18, PS.COLOR_BLACK);
            PS.borderColor(PS.ALL, 19, PS.COLOR_BLACK);
            PS.borderColor(PS.ALL, 20, PS.COLOR_BLACK);
            PS.border(15, 18, G.ret10);
            PS.border(14, 19, G.ret01);
            PS.border(16, 19, G.ret21);
            PS.border(15, 20, G.ret12);
        },

        clearSprites : function() {
            PS.spriteMove(idScoreCard, 31, 4);
            PS.spriteMove(idRetryBox, 31, 18);
        },

        timerControl : function(drop, rainx) {
            G.move(0);

            let initialTimer = PS.timerStart(rain_speed, function() {
                G.rainfall(rainx, drop);
            })

            let curTimer = initialTimer;

            G.globalTimer = PS.timerStart(840, function() {
                PS.timerStop(curTimer);
                rain_speed = G.quicken(rain_speed);
                let fasterTimer = PS.timerStart(rain_speed, function() {
                    if (G._retry) {
                        rainx = 14;
                        rain_y = -5;
                        rain2_x = 17;
                        rain2_y = -21;
                        PS.spriteMove(idRain, rainx, rain_y);
                        PS.spriteMove(idRain2, rain2_x, rain2_y);
                        PS.timerStop(fasterTimer);
                        PS.timerStop(G.globalTimer);
                        G._retry = false;
                        G.clearSprites();
                        G.startGame();
                    }
                    else
                        G.rainfall(rainx, drop);
                });
                curTimer = fasterTimer;
            })
        },

        startGame() {
            PS.border(PS.ALL, PS.ALL, 0); // no borders
            PS.statusText("When it Rains | Score: 0");
            G._play = true;
            xpos = 11;
            G.curScore = 0;
            _totalHealth = 3;
            let rain_x = this.randomizeX();
            let rain_drop_distance = 2;
            rain_speed = 6;
            G.timerControl(rain_drop_distance, rain_x);
        }
    };
}() );

PS.init = function() {
    PS.gridSize(G.width, G.height); // init grid
    PS.gridColor(0xA3A3A3);
    PS.audioLoad("fx_bloink");
    PS.audioLoad("fx_scratch");
    PS.audioLoad("perc_drum_bass");
    G.drawMap();
    G.highScore = 0;
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

PS.touch = function(x,y) {
    if (G._play === false) {
        // restart on retry button click
        if ((x > 12) && (x < 18) && (y > 17) && (y < 21)) {
            PS.audioPlay("fx_bloop");
            G._retry = true;
            PS.statusText("Restarting...");
        }
    }
}