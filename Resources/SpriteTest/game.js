// Rain by William Smith
// Made with Perlenspiel 3.3
// February 2024

"use strict";

var G; // establish game namespace

( function () {
    var id1; // sprite 1 identifier
    var id2; // sprite 2 identifier
    var xpos = 6; // x-pos of sprite 2
    var ypos = 6; // y-pos of sprite 2

    var floorPlane = 0;
    var s1Plane = 1;
    var s2Plane = 2;

    let _max_x = 29;

    G = {
        width : 32, // width of grid
        height : 32, // height of grid

        // Draw floor and initialize sprite
        drawMap : function () {
            var loader, reporter;

            PS.gridPlane(floorPlane);
            PS.color(PS.ALL, PS.ALL, PS.COLOR_GRAY);

            // Create 3x3 solid blue sprite
            // Place on plane 1 on top of grid
            id1 = PS.spriteSolid(3, 3);
            PS.spriteSolidColor(id1, PS.COLOR_BLUE);
            PS.spriteSolidAlpha(id1, 127);
            PS.spritePlane(id1, s1Plane);
            PS.spriteMove(id1, 9, 0);

            loader = function (data) {
                id2 = PS.spriteImage(data);
                PS.spritePlane(id2, s2Plane);
                PS.spriteMove(id2, xpos, ypos);
            };
            PS.imageLoad("rainguy.png", loader);

            // Create 3x3 solid green sprite
            // with 50% alpha transparency
            // Place on plane 2 at left side of grid
            id2 = PS.spriteSolid( 3, 3 );
            PS.spriteSolidColor( id2, PS.COLOR_GREEN );
            PS.spritePlane( id2, s2Plane );
            PS.spriteMove( id2, xpos, ypos );

            // Assign collision function to sprite 2

            reporter = function ( s1, p1, s2, p2, type ) {
                if ( type === PS.SPRITE_TOUCH ) {
                    type = " touched "
                }
                else {
                    type = " overlapped ";
                }
                PS.statusText( s1 + type + s2 );
            }
            PS.spriteCollide( id2, reporter );
        },

        // move( x, y )
        // Move sprite relative to current position

        move : function (x, y) {
            let nx = xpos + x;
            let ny = ypos + y;
            // If move is off grid, return
            if ((nx < 0) || (nx > _max_x)) {
                return;
            }
            xpos = nx;
            ypos = ny;
            PS.spriteMove(id2, xpos, ypos);
        }
    };
}() );

PS.init = function( system, options ) {
    PS.gridSize( G.width, G.height ); // init grid
    PS.border( PS.ALL, PS.ALL, 0 ); // no borders
    G.drawMap(); // draws walls
    PS.statusText( "Rain" );
};

PS.keyDown = function( key, shift, ctrl, options ) {
    switch ( key ) {
        case PS.KEY_ARROW_UP:
        case 119: // lower-case w
        case 87: // upper-case W
        {
            G.move( 0, -1 );
            break;
        }
        case PS.KEY_ARROW_DOWN:
        case 115: // lower-case s
        case 83: // upper-case S
        {
            G.move( 0, 1 );
            break;
        }
        case PS.KEY_ARROW_LEFT:
        case 97: // lower-case a
        case 65: // upper-case A
        {
            G.move( -1, 0 );
            break;
        }
        case PS.KEY_ARROW_RIGHT:
        case 100: // lower-case d
        case 68: // upper-case D
        {
            G.move( 1, 0 );
            break;
        }
    }
};