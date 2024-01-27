// Cross-Stitch by William Smith
// Made with Perlenspiel 3.3
// January 2024

"use strict";

const G = ( function() {

    let _level = 0;

    let _width;
    let _height;

    const _LEVELS = [
        // Level 0
        {
            _width : 3,
            _height : 3,

            colorSet : [[0, 2, 0,
                         2, 2, 2,
                         0, 2, 0]]
        },

        // Level 1
        {
            _width : 3,
            _height : 3,

            colorSet : [[1, 1, 0,
                         1, 0, 2,
                         0, 2, 2]]
        },

        // Level 2
        {
            _width : 3,
            _height : 3,

            colorSet : [[2, 2, 2,
                         0, 1, 0,
                         2, 2, 2]]
        },

        // Level 3
        {
            _width : 2,
            _height : 2,

            colorSet : [[2, 1,
                         1, 2]]
        },

        // Level 4
        {
            _width : 2,
            _height : 2,

            colorSet : [[0, 2,
                         0, 1]]
        },

        // Level 5
        {
            _width : 3,
            _height : 2,

            colorSet : [[1, 2, 1,
                         2, 0, 2]]
        },

        // Level 6
        {
            _width : 3,
            _height : 2,

            colorSet : [[0, 1, 1,
                         2, 1, 0]]
        },

        // Level 7
        {
            _width : 3,
            _height : 3,

            colorSet : [[1, 2, 0,
                         0, 1, 0,
                         0, 1, 2]]
        },

        // Level 8
        {
            _width : 3,
            _height : 3,

            colorSet : [[1, 1, 1,
                         1, 0, 1,
                         1, 2, 1]]
        },

        // Level 9
        {
            _width : 3,
            _height : 3,

            colorSet : [[1, 0, 1,
                         0, 1, 0,
                         0, 1, 0]]
        },

        // Level 10
        {
            _width : 5,
            _height : 5,

            colorSet : [[0, 0, 0, 0, 0,
                         0, 0, 0, 0, 0,
                         0, 0, 2, 0, 0,
                         0, 0, 0, 0, 0,
                         0, 0, 0, 0, 0]]
        }
    ];

    const _startLevel = function (val) {
        _level = val;
        PS.statusText("Cross-Stitch --- Lv "+_level);

        let data = _LEVELS[_level];
        _width = data._width;
        _height = data._height;

        PS.gridSize(_width, _height+1);
        PS.border(PS.ALL, _height, 0);

        PS.glyph(_width-1, _height, 0x21BA);
        PS.border(_width-1, _height, 5);
        PS.borderColor(_width-1, _height, PS.COLOR_BLACK);
        PS.color(_width-1, _height, PS.COLOR_GRAY_LIGHT);
        PS.scale(_width-1, _height, 55);
        PS.radius(_width-1, _height, 35);

        // set colors
        let acc = 0;
        let myColor;
        for (let h = 0; h < _height; h += 1) {
            for (let w = 0; w < _width; w += 1) {
                if (data.colorSet[0][acc] == 0)
                    myColor = PS.COLOR_WHITE;
                else if (data.colorSet[0][acc] == 1)
                    myColor = PS.COLOR_GRAY;
                else
                    myColor = PS.COLOR_BLACK;
                PS.color(w, h, myColor);
                acc += 1;
            }
        }
    };

    const colorChange = function (a, b) {
        if (PS.color(a, b) == PS.COLOR_BLACK) {
            PS.color(a, b, PS.COLOR_WHITE);
            PS.audioPlay("fx_click");
        }
        else if (PS.color(a, b) == PS.COLOR_GRAY) {
            PS.color(a, b, PS.COLOR_BLACK);
            PS.audioPlay("fx_click");
        }
        else if (PS.color(a, b) == PS.COLOR_WHITE) {
            PS.color(a, b, PS.COLOR_GRAY);
            PS.audioPlay("fx_click");
        }
        else {
            PS.color(a, b, PS.COLOR_RED);
            PS.audioPlay("fx_click");
        }
    };

    return {
        init : function() {
            _startLevel(_level);
        },

        touch : function(x, y, data, options) {
            if (y == _height) {
                if (x == _width-1) {
                    PS.audioPlay("fx_pop");
                    _startLevel(_level);
                    return;
                }
                else
                    return;
            }
            colorChange(x, y);
            if (x - 1 > -1)
                colorChange(x - 1, y);
            if (x + 1 < _width)
                colorChange(x + 1, y);
            if (y - 1 > -1)
                colorChange(x, y - 1);
            if (y + 1 < _height)
                colorChange(x, y + 1);

            let win = true;
            for (let i = 0; i < _width; i += 1) {
                for (let j = 0; j < _height; j += 1) {
                    if (PS.color(i, j) != PS.COLOR_WHITE)
                        win = false;
                }
            }
            if (win == true) {
                let len = _LEVELS.length;
                if (_level == 10)
                    PS.audioPlay("fx_tada");
                else
                    PS.audioPlay("fx_swoosh");
                if ((_level + 1) < len)
                    _level += 1;
                _startLevel(_level);
                return;
            }
        }
    };
} () );

PS.init = G.init;
PS.touch = G.touch;