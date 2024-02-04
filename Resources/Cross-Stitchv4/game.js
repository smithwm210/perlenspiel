// Cross-Stitch by William Smith
// Made with Perlenspiel 3.3
// February 2024

"use strict";

const G = ( function() {

    var _play = true;
    var _menuing = false;
    var _reset = false;
    var _transition = false;
    var _page = 1;

    const _IS_GLASS = "glass";
    const _IS_X = "xblock";

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

            colorSet : [[0, 1, 1,
                        2, 1, 0]]
        },

         // Level 7
         {
             _width : 3,
             _height : 2,

             colorSet : [[1, 2, 1,
                          2, 0, 2]]
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

         // Level C1
         {
             _width : 4,
             _height : 4,

             colorSet : [[0, 0, 0, 0,
                          1, 0, 1, 0,
                          0, 1, 0, 0,
                          1, 0, 1, 0]],

             xblocks : [[1, 2]]
         },

         // Level C2
         {
             _width : 3,
             _height : 3,

             colorSet : [[1, 0, 2,
                          2, 0, 0,
                          0, 2, 1]],

             xblocks : [[1, 1]]
         },

         // Level C3
         {
             _width : 3,
             _height : 3,

             colorSet : [[2, 1, 2,
                          2, 1, 1,
                          0, 2, 2]],

             xblocks : [[2, 0]]
         },

         // Level C4
         {
             _width : 3,
             _height : 3,

             colorSet : [[0, 0, 1,
                          0, 2, 0,
                          0, 0, 1]],

             xblocks : [[0, 1], [2, 1]]
         },

         // Level C5
         {
             _width: 3,
             _height: 3,

             colorSet : [[0, 2, 2,
                          2, 1, 0,
                          2, 2, 0]],

             xblocks : [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [0, 2], [1, 2], [2, 2]]
         },

        // Level C6
         {
             _width: 3,
             _height: 3,

             colorSet : [[2, 0, 0,
                          0, 0, 1,
                          0, 0, 1]],

             glasses : [[2, 1], [1, 2], [2, 2]],

             xblocks : [[1, 0], [1, 1]]
         },

        // Level C7
        {
            _width: 4,
            _height: 3,

            colorSet : [[2, 2, 2, 1,
                         1, 0, 0, 2,
                         1, 2, 0, 1]],

            glasses : [[1, 0], [3, 0], [3, 1]],

            xblocks : [[2, 1]]
        },

        // Level C8
        {
            _width: 4,
            _height: 4,

            colorSet : [[0, 2, 2, 0,
                         1, 1, 1, 2,
                         2, 2, 0, 2,
                         2, 2, 1, 2]],

            glasses : [[1, 1], [0, 2], [3, 2], [0, 3]],

            xblocks : [[0, 0], [1, 0], [1, 2]]
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

    const _place_x = function (x, y) {
        PS.glyphColor(x, y, 0xE06666);
        PS.glyph(x, y, 0x26CC);
        PS.glyphAlpha(x, y, 180);
        PS.data(x, y, _IS_X);
    };

    const _setPage = function (val) {
        if (val < 10)
            _page = 1;
        else if (val < 19)
            _page = 2;
        else
            _page = 3;

        return _page;
    };

    const _openMenu = function (val) {
        _play = false;

        PS.gridSize(3, 4);
        PS.gridColor(PS.COLOR_WHITE);
        PS.border(PS.ALL, PS.ALL, 0);

        let _menuHeight = 3;
        let _menuWidth = 3;
        let _menu_border_color = PS.COLOR_BLACK;
        let _menu_tile_color = PS.COLOR_WHITE;
        let _menu_glyph_color = PS.COLOR_BLACK;

        // page 1
        if (val == 1) {
            PS.gridColor(PS.COLOR_WHITE);
            PS.statusColor(PS.COLOR_BLACK);
            _menu_tile_color = PS.COLOR_WHITE;
            _menu_border_color = PS.COLOR_BLACK;
            _menu_glyph_color = PS.COLOR_BLACK;
        }
        // page 2
        else if (val == 2) {
            PS.gridColor(PS.COLOR_GRAY);
            PS.statusColor(PS.COLOR_BLACK);
            _menu_tile_color = PS.COLOR_GRAY_LIGHT;
            _menu_border_color = PS.COLOR_BLACK;
            _menu_glyph_color = PS.COLOR_BLACK;
        }
        // page 3
        else {
            PS.gridColor(PS.COLOR_BLACK);
            PS.statusColor(PS.COLOR_WHITE);
            _menu_tile_color = PS.color(0, 0, 88, 88, 88);
            _menu_border_color = PS.COLOR_WHITE;
            _menu_glyph_color = PS.COLOR_WHITE;
        }

        PS.statusText("Set "+val);

        let _lvlNum;
        let acc = 1;
        for (let a = 0; a < _menuHeight; a++) {
            for (let b = 0; b < _menuWidth; b++) {
                _lvlNum = String(acc);
                PS.glyph(b, a, _lvlNum);
                PS.glyphScale(b, a, 60);
                PS.glyphColor(b, a, _menu_glyph_color);
                PS.border(b, a, 3);
                PS.borderColor(b, a, _menu_border_color);
                PS.color(b, a, _menu_tile_color);
                PS.scale(b, a, 75);
                PS.radius(b, a, 35);
                acc++;
            }
        }

        // next button
        PS.glyph(1, 3, "⇨");
        PS.glyphColor(1, 3, _menu_glyph_color);
        PS.border(1, 3, 5);
        PS.borderColor(1, 3, _menu_border_color);
        PS.color(1, 3, _menu_tile_color);
        PS.scale(1, 3, 55);
        PS.radius(1, 3, 35);
        PS.alpha(0, 3, 0);
        PS.alpha(2, 3, 0);
    };

    const _setTransition = function(val) {
        _play = false;
        _menuing = false;
        _transition = true;

        let _tsColor = PS.COLOR_GRAY;
        let _tsGlyph = "⇨";
        let _tsTime = 30;

        PS.gridSize(5, 5);

        if (val == 9) {
            PS.statusColor(PS.COLOR_BLACK);
            _tsColor = PS.COLOR_GRAY;
            PS.statusText("Set 1 Clear!");
            _tsGlyph = "⇨";
            _tsTime = 40;
        }
        else if (val == 18) {
            PS.statusColor(PS.COLOR_WHITE);
            _tsColor = PS.COLOR_BLACK;
            PS.statusText("Set 2 Clear!");
            _tsGlyph = "⇨";
            _tsTime = 40;
        }
        else {
            PS.statusColor(PS.COLOR_BLACK);
            PS.color(PS.ALL, PS.ALL, PS.COLOR_BLACK);
            _tsColor = PS.COLOR_WHITE;
            PS.statusText("Game Clear! Thanks for playing!");
            _tsGlyph = "≡";
            _tsTime = 60;
        }

        PS.border(PS.ALL, PS.ALL, 0);
        if (val < 20) {
            PS.fade(PS.ALL, 0, 10);
            PS.fade(PS.ALL, 1, 15);
            PS.fade(PS.ALL, 2, 20);
            PS.fade(PS.ALL, 3, 25);
            PS.fade(PS.ALL, 4, 30);
        }
        else {
            PS.fade(0, 0, 10);
            PS.fade(1, 0, 15);
            PS.fade(0, 1, 15);
            PS.fade(2, 0, 20);
            PS.fade(1, 1, 20);
            PS.fade(0, 2, 20);
            PS.fade(3, 0, 25);
            PS.fade(2, 1, 25);
            PS.fade(1, 2, 25);
            PS.fade(0, 3, 25);
            PS.fade(4, 0, 30);
            PS.fade(3, 1, 30);
            PS.fade(2, 2, 30);
            PS.fade(1, 3, 30);
            PS.fade(0, 4, 30);
            PS.fade(4, 1, 35);
            PS.fade(3, 2, 35);
            PS.fade(2, 3, 35);
            PS.fade(1, 4, 35);
            PS.fade(4, 2, 40);
            PS.fade(3, 3, 40);
            PS.fade(2, 4, 40);
            PS.fade(4, 3, 45);
            PS.fade(3, 4, 45);
            PS.fade(4, 4, 50);
        }
        PS.gridColor(_tsColor);
        PS.color(PS.ALL, PS.ALL, _tsColor);

        // next button
        PS.glyph(2, 2, _tsGlyph);
        PS.glyphColor(2, 2, PS.COLOR_BLACK);
        PS.color(2, 2, PS.COLOR_GRAY_LIGHT);
        PS.radius(2, 2, 35);
        PS.scale(2, 2, 85);

        // turn off faders
        let timer = PS.timerStart(_tsTime, function() {
            PS.timerStop(timer);
            PS.fade(PS.ALL, PS.ALL, 0);
        } );
    };

    const _startLevel = function (val) {
        if (_reset == false)
            _play = false;
        
        _menuing = false;
        
        let _lvlNum = _level % 9;
        if (_lvlNum == 0)
            _lvlNum = 9;
        PS.statusText("Cross-Stitch --- Lv "+_lvlNum+"/9");

        let data = _LEVELS[_level-1];

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

        // set up menu button
        PS.glyph(0, _height, "≡");
        PS.border(0, _height, 5);
        PS.borderColor(0, _height, PS.COLOR_BLACK);
        PS.color(0, _height, PS.COLOR_GRAY_LIGHT);
        PS.scale(0, _height, 55);
        PS.radius(0, _height, 35);

        // enable fader
        if (_reset == false)
            PS.fade(PS.ALL, PS.ALL, 17);

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

        // place x-blocks
        if (data.xblocks !== undefined) {
            let len = data.xblocks.length;
            for (let i = 0; i < len; i += 1) {
                let pos = data.xblocks[i];
                let x = pos[0];
                let y = pos[1];
                _place_x(x, y);
            }
        }

        if (_reset == false) {
            // turn off faders and enable play
            let timer = PS.timerStart(30, function() {
                PS.timerStop(timer);
                PS.fade(PS.ALL, PS.ALL, 0);
                _play = true;
            } );
        }
        _reset = false;
    };

    const colorChange = function(a, b) {
        // black -> white
        if (PS.color(a, b) == PS.COLOR_BLACK) {
            PS.color(a, b, PS.COLOR_WHITE);
            return PS.COLOR_WHITE;
        }
        // gray -> black
        else if (PS.color(a, b) == PS.COLOR_GRAY) {
            PS.color(a, b, PS.COLOR_BLACK);
            return PS.COLOR_BLACK;
        }
        // white -> gray
        else if (PS.color(a, b) == PS.COLOR_WHITE) {
            PS.color(a, b, PS.COLOR_GRAY);
            return PS.COLOR_GRAY;
        }
        else
            return;
    };

    const _highlight = function(a, b, c, n) {
        if (_level < 10) {
            PS.glyphAlpha(a, b, 100);
            PS.glyphColor(a, b, 0x93c47d);
            if (n == 0)
                PS.glyph(a, b, "⭘");
            else if (n == 1)
                PS.glyph(a, b, "⫏");
            else if (n == 2)
                PS.glyph(a, b, "⩍");
            else if (n == 3)
                PS.glyph(a, b, "⫐");
            else if (n == 4)
                PS.glyph(a, b, "⩌");

            PS.glyphFade(a, b, 12);

            PS.glyphColor(a, b, c);

            let timer = PS.timerStart(20, function () {
                PS.timerStop(timer);
                PS.glyphFade(PS.ALL, PS.ALL, 0);
                if ((a < _width) && (b < _height) && (_transition == false)) {
                    PS.glyphAlpha(a, b, 0);
                    PS.glyphColor(a, b, c);
                }
                return;
            });
        }
    };

    const _levelClear = function() {
        _play = false;

        PS.fade(PS.ALL, PS.ALL, 25);
        PS.borderFade(PS.ALL, PS.ALL, 25);
        PS.glyphFade(PS.ALL, PS.ALL, 18);

        PS.color(PS.ALL, PS.ALL, PS.COLOR_WHITE);
        PS.borderColor(PS.ALL, PS.ALL, PS.COLOR_WHITE);
        PS.glyphColor(PS.ALL, PS.ALL, PS.COLOR_WHITE);

        let timer = PS.timerStart(60, function() {
            PS.timerStop(timer);
            PS.fade(PS.ALL, PS.ALL, 0);
            PS.borderFade(PS.ALL, PS.ALL, 0);
            PS.glyphFade(PS.ALL, PS.ALL, 0);
            if ((_level == 9) || (_level == 18) || (_level == 27)) {
                _setTransition(_level);
                PS.audioPlay("fx_ding", {
                    volume: 0.6
                });
                return;
            }
            PS.audioPlay("fx_swoosh", {
                volume: 0.55
            });
            if (_level < _LEVELS.length)
                _level += 1;
            _startLevel(_level);
            return;
        } );
    }

    return {
        init : function() {
            _startLevel(_level);
        },

        touch : function(x, y, data, options) {
            if (_play == true) {
                // left coords
                let target1x = x - 1;
                let target1y = y;
                // up coords
                let target2x = x;
                let target2y = y - 1;
                // right coords
                let target3x = x + 1;
                let target3y = y;
                // down coords
                let target4x = x;
                let target4y = y + 1;

                if (y == _height) {
                    // reset button
                    if (x == _width - 1) {
                        _reset = true;
                        PS.audioPlay("fx_pop", {
                            volume: 0.8
                        });
                        _startLevel(_level);
                        return;
                    }
                    // menu button
                    else if (x == 0) {
                        _menuing = true;
                        PS.audioPlay("fx_bloop", {
                            volume: 0.9
                        });
                        let pg = _setPage(_level);
                        _openMenu(pg);
                        return;
                    } else
                        return;
                } else if (data === _IS_GLASS) {
                    PS.audioPlay("fx_tick", {
                        volume: 1
                    });
                    return;
                } else if (data === _IS_X) {
                    PS.audioPlay("fx_squink", {
                        volume: 0.3
                    });
                    target1y = y - 1;
                    target2x = x + 1;
                    target3y = y + 1;
                    target4x = x - 1;
                }
                PS.audioPlay("fx_click", {
                    volume: 0.75
                });
                let _gColor = colorChange(x, y);
                _highlight(x, y, _gColor, 0);
                if ((target1x > -1) && (target1y > -1)) {
                    _gColor = colorChange(target1x, target1y);
                    _highlight(target1x, target1y, _gColor, 1);
                }
                if ((target2x < _width) && (target2y > -1)) {
                    _gColor = colorChange(target2x, target2y);
                    _highlight(target2x, target2y, _gColor, 2);
                }
                if ((target3x < _width) && (target3y < _height)) {
                    _gColor = colorChange(target3x, target3y);
                    _highlight(target3x, target3y, _gColor, 3);
                }
                if ((target4x > -1) && (target4y < _height)) {
                    _gColor = colorChange(target4x, target4y);
                    _highlight(target4x, target4y, _gColor, 4);
                }

                let win = true;
                for (let i = 0; i < _width; i += 1) {
                    for (let j = 0; j < _height; j += 1) {
                        if (PS.color(i, j) != PS.COLOR_WHITE)
                            win = false;
                    }
                }
                if (win == true)
                    _levelClear();
            }
            // menuing
            else if (_menuing == true) {
                if (y == 3) {
                    if (x == 1) {
                        _page += 1;
                        if (_page > 3)
                            _page = 1;
                        PS.audioPlay("fx_swoosh", {
                            volume: 0.55
                        });
                        _openMenu(_page);
                    }
                    return;
                }
                _menuing = false;
                PS.audioPlay("fx_boop", {
                    volume: 0.9
                });
                let _label = (x + (3*y) + 1);
                let _selectedLvl = (((_page - 1)*9) + _label);
                _level = _selectedLvl;
                _startLevel(_level);
            }
            else if (_transition == true) {
                if ((x == 2) && (y == 2)) {
                    if (_level == _LEVELS.length) {
                        PS.audioPlay("fx_bloop", {
                            volume: 0.9
                        });
                        _level = 1;
                        _page = 1;
                        _menuing = true;
                        _openMenu(1);
                    }
                    else {
                        PS.audioPlay("fx_swoosh", {
                            volume: 0.55
                        });
                        _level += 1;
                        _startLevel(_level);
                        return;
                    }
                }
            }
            else
                return;
        }
    };
} () );

PS.init = G.init;
PS.touch = G.touch;