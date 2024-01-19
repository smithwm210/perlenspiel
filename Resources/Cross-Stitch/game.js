PS.init = function( system, options ) {
	PS.gridSize( 5, 5 );

    PS.color(PS.ALL, PS.ALL, PS.COLOR_WHITE);
    PS.color(0, 0, PS.COLOR_GRAY);
    PS.color(1, 0, PS.COLOR_GRAY);
    PS.color(0, 1, PS.COLOR_GRAY);
    PS.color(3, 0, PS.COLOR_GRAY);
    PS.color(4, 0, PS.COLOR_GRAY);
    PS.color(4, 1, PS.COLOR_GRAY);
    PS.color(0, 3, PS.COLOR_GRAY);
    PS.color(0, 4, PS.COLOR_GRAY);
    PS.color(1, 4, PS.COLOR_GRAY);
    PS.color(4, 3, PS.COLOR_GRAY);
    PS.color(3, 4, PS.COLOR_GRAY);
    PS.color(4, 4, PS.COLOR_GRAY);
    PS.color(2, 2, PS.COLOR_BLACK);

	PS.statusText( "Cross-Stitch" );
};

PS.touch = function(x, y, data, options) {
    colorChange(x, y);
    if (x-1 > -1) {
        colorChange(x-1, y);
    }
    if (x+1 < 5) {
        colorChange(x+1, y);
    }
    if (y-1 > -1) {
        colorChange(x, y-1);
    }
    if (y+1 < 5) {
        colorChange(x, y+1);
    }

    // check if the grid all one color
    if (((PS.color(0, 0) == PS.COLOR_WHITE) && (PS.color(0, 1) == PS.COLOR_WHITE)
        && (PS.color(0, 2) == PS.COLOR_WHITE) && (PS.color(0, 3) == PS.COLOR_WHITE)
        && (PS.color(0, 4) == PS.COLOR_WHITE) && (PS.color(1, 0) == PS.COLOR_WHITE)
        && (PS.color(1, 1) == PS.COLOR_WHITE) && (PS.color(1, 2) == PS.COLOR_WHITE)
        && (PS.color(1, 3) == PS.COLOR_WHITE) && (PS.color(1, 4) == PS.COLOR_WHITE)
        && (PS.color(2, 0) == PS.COLOR_WHITE) && (PS.color(2, 1) == PS.COLOR_WHITE)
        && (PS.color(2, 2) == PS.COLOR_WHITE) && (PS.color(2, 3) == PS.COLOR_WHITE)
        && (PS.color(2, 4) == PS.COLOR_WHITE) && (PS.color(3, 0) == PS.COLOR_WHITE)
        && (PS.color(3, 1) == PS.COLOR_WHITE) && (PS.color(3, 2) == PS.COLOR_WHITE)
        && (PS.color(3, 3) == PS.COLOR_WHITE) && (PS.color(3, 4) == PS.COLOR_WHITE)
        && (PS.color(4, 0) == PS.COLOR_WHITE) && (PS.color(4, 1) == PS.COLOR_WHITE)
        && (PS.color(4, 2) == PS.COLOR_WHITE) && (PS.color(4, 3) == PS.COLOR_WHITE)
        && (PS.color(4, 4) == PS.COLOR_WHITE)) ||
        ((PS.color(0, 0) == PS.COLOR_GRAY) && (PS.color(0, 1) == PS.COLOR_GRAY)
        && (PS.color(0, 2) == PS.COLOR_GRAY) && (PS.color(0, 3) == PS.COLOR_GRAY)
        && (PS.color(0, 4) == PS.COLOR_GRAY) && (PS.color(1, 0) == PS.COLOR_GRAY)
        && (PS.color(1, 1) == PS.COLOR_GRAY) && (PS.color(1, 2) == PS.COLOR_GRAY)
        && (PS.color(1, 3) == PS.COLOR_GRAY) && (PS.color(1, 4) == PS.COLOR_GRAY)
        && (PS.color(2, 0) == PS.COLOR_GRAY) && (PS.color(2, 1) == PS.COLOR_GRAY)
        && (PS.color(2, 2) == PS.COLOR_GRAY) && (PS.color(2, 3) == PS.COLOR_GRAY)
        && (PS.color(2, 4) == PS.COLOR_GRAY) && (PS.color(3, 0) == PS.COLOR_GRAY)
        && (PS.color(3, 1) == PS.COLOR_GRAY) && (PS.color(3, 2) == PS.COLOR_GRAY)
        && (PS.color(3, 3) == PS.COLOR_GRAY) && (PS.color(3, 4) == PS.COLOR_GRAY)
        && (PS.color(4, 0) == PS.COLOR_GRAY) && (PS.color(4, 1) == PS.COLOR_GRAY)
        && (PS.color(4, 2) == PS.COLOR_GRAY) && (PS.color(4, 3) == PS.COLOR_GRAY)
        && (PS.color(4, 4) == PS.COLOR_GRAY)) ||
        ((PS.color(0, 0) == PS.COLOR_BLACK) && (PS.color(0, 1) == PS.COLOR_BLACK)
            && (PS.color(0, 2) == PS.COLOR_BLACK) && (PS.color(0, 3) == PS.COLOR_BLACK)
            && (PS.color(0, 4) == PS.COLOR_BLACK) && (PS.color(1, 0) == PS.COLOR_BLACK)
            && (PS.color(1, 1) == PS.COLOR_BLACK) && (PS.color(1, 2) == PS.COLOR_BLACK)
            && (PS.color(1, 3) == PS.COLOR_BLACK) && (PS.color(1, 4) == PS.COLOR_BLACK)
            && (PS.color(2, 0) == PS.COLOR_BLACK) && (PS.color(2, 1) == PS.COLOR_BLACK)
            && (PS.color(2, 2) == PS.COLOR_BLACK) && (PS.color(2, 3) == PS.COLOR_BLACK)
            && (PS.color(2, 4) == PS.COLOR_BLACK) && (PS.color(3, 0) == PS.COLOR_BLACK)
            && (PS.color(3, 1) == PS.COLOR_BLACK) && (PS.color(3, 2) == PS.COLOR_BLACK)
            && (PS.color(3, 3) == PS.COLOR_BLACK) && (PS.color(3, 4) == PS.COLOR_BLACK)
            && (PS.color(4, 0) == PS.COLOR_BLACK) && (PS.color(4, 1) == PS.COLOR_BLACK)
            && (PS.color(4, 2) == PS.COLOR_BLACK) && (PS.color(4, 3) == PS.COLOR_BLACK)
            && (PS.color(4, 4) == PS.COLOR_BLACK))) {
        PS.statusText("Nice job!");
        PS.audioPlay("fx_tada");
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
}