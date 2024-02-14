// Rain by William Smith
// Made with Perlenspiel 3.3
// February 2024

"use strict";

const G = ( function() {

    const _width = 32;
    const _height = 32;

    let _level = 0;

    let _player_x;
    let _player_y;

    var id;
    var myImage;
    var mySprite;

    var floorPlane = 0;
    var spritePlane = 1;

    const _IS_AIR = "air";
    const _IS_PLAYER = "player";

    // PS.spriteAxis(mySprite, 4, 6);

    const _LEVELS = [
        // Level 0
        {
            _player_x : 5,
            _player_y : 28
        }
    ];

    const _place_player = function(x, y) {
        _player_x = x;
        _player_y = y;


        PS.spriteMove(id, _player_x, _player_y);
        PS.data(x, y, _IS_PLAYER);
    };

    const _startLevel = function (_level) {

        PS.data(PS.ALL, PS.ALL, _IS_AIR);

        let data = _LEVELS[_level];

        _place_player(data._player_x, data._player_y);
    };


    return {
        init : function() {
            PS.gridSize(_width, _height);
            PS.gridColor(PS.COLOR_GRAY);
            PS.border(PS.ALL, PS.ALL, 0);
            PS.color(PS.ALL, _height-1, PS.COLOR_GREEN);
            PS.statusText("Rain");
            PS.imageLoad("rainguy.png", function(data) {
                myImage = data;
                PS.debug(myImage);
                mySprite = PS.spriteImage(data);
                id = PS.spriteImage(data);
            });
            // id = PS.spriteImage(data);
            PS.debug("id: " + id);
            _startLevel(_level);
        },

    };
} () );

PS.init = G.init;