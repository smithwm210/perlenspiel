// Cross-Stitch by William Smith
// Made with Perlenspiel 3.3
// January 2024

"use strict";

const G = ( function() {

    const _IS_GLASS = "glass";

    let _level = 1;

    let _width;
    let _height;

    const _LEVELS = [

        // Level 1
        {
            _width : 3,
            _height : 3,

            colorSet : [[0, 2, 0,
                         2, 2, 2,
                         0, 2, 0]]
        },

        // Level 2
        {
            _width : 3,
            _height : 3,

            colorSet : [[1, 1, 0,
                         1, 0, 2,
                         0, 2, 2]]
        },

        // Level 3
        {
            _width : 3,
            _height : 3,

            colorSet : [[2, 2, 2,
                         0, 1, 0,
                         2, 2, 2]]
        },

        // Level 4
        {
            _width : 2,
            _height : 2,

            colorSet : [[2, 1,
                         1, 2]]
        },

        // Level 5
        {
            _width : 2,
            _height : 2,

            colorSet : [[0, 2,
                         0, 1]]
        },

        // Level 6
        {
            _width : 3,
            _height : 2,

            colorSet : [[1, 2, 1,
                         2, 0, 2]]
        },

        // Level 7
        {
            _width : 3,
            _height : 2,

            colorSet : [[0, 1, 1,
                         2, 1, 0]]
        },

        // Level 8
        {
            _width : 3,
            _height : 3,

            colorSet : [[1, 2, 0,
                         0, 1, 0,
                         0, 1, 2]]
        },

        // Level 9
        {
            _width : 3,
            _height : 3,

            colorSet : [[2, 1, 2,
                         2, 2, 2,
                         2, 2, 2]]
        },

        // Level B1
        {
            _width : 3,
            _height : 2,

            colorSet : [[2, 0, 0,
                         2, 2, 0]],

            glasses : [[0, 1]]
        },

        // Level B2
        {
            _width : 4,
            _height : 1,

            colorSet : [[1, 2, 0, 1]],

            glasses : [[3, 0]]
        },

        // Level B3
        {
            _width : 4,
            _height : 2,

            colorSet : [[0, 2, 1, 1,
                         1, 0, 2, 1]],

            glasses : [[0, 0], [1, 1]]
        },

        // Level B4
        {
            _width : 3,
            _height : 3,

            colorSet : [[1, 2, 0,
                         0, 0, 1,
                         0, 1, 0]],

            glasses : [[1, 0], [0, 1], [0, 2]]
        },

        // Level B5
        {
            _width : 3,
            _height : 3,

            colorSet : [[1, 2, 2,
                         2, 1, 1,
                         0, 0, 1]],

            glasses : [[1, 0], [1, 1], [1, 2]]
        },

        // Level B6
        {
            _width : 3,
            _height : 3,

            colorSet : [[0, 0, 2,
                         1, 1, 1,
                         0, 0, 0]],

            glasses : [[0, 0], [2, 0], [1, 2], [2, 2]]
        },

        // Level B7
        {
            _width : 4,
            _height : 4,

            colorSet : [[2, 2, 2, 2,
                         2, 2, 2, 2,
                         2, 2, 2, 2,
                         2, 2, 2, 2]],

            glasses : [[1, 1], [2, 1], [1, 2], [2, 2]]
        },

        // Level B8
        {
            _width : 4,
            _height : 4,

            colorSet : [[1, 1, 2, 2,
                         2, 0, 1, 2,
                         0, 0, 0, 0,
                         1, 0, 1, 1]],

            glasses : [[2, 0], [3, 0], [2, 1], [1, 2], [0, 3], [1, 3]]
        },

        // Level B9
        {
            _width : 4,
            _height : 4,

            colorSet : [[1, 1, 1, 0,
                         1, 2, 0, 0,
                         0, 1, 1, 2,
                         0, 0, 0, 1]],

            glasses : [[0, 1], [1, 1], [2, 1], [1, 2]]
        },

        // Level FINAL
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

    const _place_glass = function (x, y) {
        PS.glyphColor(x, y, 0x1FD6CD);
        PS.glyph(x, y, 0x259E);
        PS.glyphAlpha(x, y, 100);
        PS.data(x, y, _IS_GLASS);
    };

    const _startLevel = function (val) {
        PS.statusText("Cross-Stitch --- Lv "+_level+"/"+_LEVELS.length);

        let data = _LEVELS[_level-1];
        
        _level = val;

        _width = data._width;
        _height = data._height;

        PS.gridSize(_width, _height+1);
        PS.border(PS.ALL, _height, 0);

        // set up reset button
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

        // place glass blocks
        if (data.glasses !== undefined) {
            let len = data.glasses.length;
            for (let i = 0; i < len; i += 1) {
                let pos = data.glasses[i];
                let x = pos[0];
                let y = pos[1];
                _place_glass(x, y);
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
            else if (data === _IS_GLASS) {
                PS.audioPlay("fx_tick");
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
                if (_level == len)
                    PS.audioPlay("fx_tada");
                else
                    PS.audioPlay("fx_swoosh");
                if ((_level) < len)
                    _level += 1;
                _startLevel(_level);
                return;
            }
        }
    };
} () );

PS.init = G.init;
PS.touch = G.touch;