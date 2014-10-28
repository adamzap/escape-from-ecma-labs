(function(root) {
    'use strict';

    var DIRECTIONS_TO_OFFSETS = {
        up:           {x:  0, y: -1},
        up_right:     {x:  1, y: -1},
        right:        {x:  1, y:  0},
        down_right:   {x:  1, y:  1},
        down:         {x:  0, y:  1},
        down_left:    {x: -1, y:  1},
        left:         {x: -1, y:  0},
        up_left:      {x: -1, y: -1}
    };

    var DIRECTIONS = [
        'up',
        'down',
        'left',
        'right'
    ];
    var DIRECTIONS_WITH_DIAGONALS = [
        'up',
        'up_right',
        'right',
        'down_right',
        'down',
        'down_left',
        'left',
        'up_left'
    ];

    var TILE_DRAW_DATA_KEYS = [
        'x',
        'y',
        'char',
        'color',
        'bgColor',
        'borderColor',
        'borderWidth',
        'fontSize',
        'charStrokeColor',
        'charStrokeWidth'
    ];

    /**
    * Utility functions
    * @class Util
    * @static
    */
    var Util = {


        /**
         * Maps directions to coord offsets
         * ( keys of Util.DIRECTIONS_TO_OFFSETS)
         * @property DIRECTIONS
         * @type Array
         * @static
         * @final
         * @example
         *     `
         *      [
         *          'up',
         *          'up_right',
         *          'right',
         *          'down_right',
         *          'down',
         *          'down_left',
         *          'left',
         *          'up_left',
         *      ]
         *     `
         */
        DIRECTIONS: DIRECTIONS,

        /**
         * Maps direction names to coord offsets.
         * @property DIRECTIONS_TO_OFFSETS
         * @type Object
         * @static
         * @final
         * @example
         *     `{
         *        up:           {x:  0, y: -1},
         *        up_right:     {x:  1, y: -1},
         *        right:        {x:  1, y:  0},
         *        down_right:   {x:  1, y:  1},
         *        down:         {x:  0, y:  1},
         *        down_left:    {x: -1, y:  1},
         *        left:         {x: -1, y:  0},
         *        up_left:      {x: -1, y: -1}
         *     }`
         */
        DIRECTIONS_TO_OFFSETS: DIRECTIONS_TO_OFFSETS,

        TILE_DRAW_DATA_KEYS: TILE_DRAW_DATA_KEYS,

        /**
        * Merges settings with default values.
        * @method mergeDefaults
        * @static
        * @param {Object} defaults - Default values to merge with.
        * @param {Object} settings - Settings to merge with default values.
        * @return {Object} A new object with settings replacing defaults.
        */
        mergeDefaults: function(defaults, settings) {
            var out = {};
            for (var key in defaults) {
                if (key in settings) {
                    out[key] = settings[key];
                } else {
                    out[key] = defaults[key];
                }
            }
            return out;
        },

        /**
        * Copies properties from `source` object to `destination` object.
        * @method merge
        * @static
        * @param {Object} destination - The object to copy properties to.
        * @param {Object} source - The object to copy properties from.
        * @return {Object} destination object
        */
        merge: function(destination, source){
            for(var key in source){
                destination[key] = source[key];
            }
            return destination;
        },

        /**
        * Gets the adjacent coords of a given x, y, direction.
        * @method getAdjacentTileCoordsFromDirection
        * @static
        * @param {String} direction - valid directions: [`up`, `down`, `left`, `right`, `up_left`, `up_right`, `down_left`, `down_right`];.
        * @return {Object} `{x: 0, y: 0}`
        */
        getOffsetCoordsFromDirection: function(direction){
            return {
                x: this.DIRECTIONS_TO_OFFSETS[direction].x,
                y: this.DIRECTIONS_TO_OFFSETS[direction].y
            };
        },

        /**
         * Gets the distance in tile moves from point 1 to point 2.
         * @method getTileMoveDistance
         * @param {Number} x1
         * @param {Number} y1
         * @param {Number} x2
         * @param {Number} y2
         * @param {Bool} [diagonalMovement = false]if true, calculate the distance taking into account diagonal movement.
         * @return {Number}
         */
        getTileMoveDistance: function(x1, y1, x2, y2, diagonalMovement){
            if(!diagonalMovement){
                return Math.abs(x2 - x1) + Math.abs(y2 - y1);
            } else {
                return Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
            }
        },

        /**
         * Gets the distance from point 1 to point 2.
         * @method getDistance
         * @param {Number} x1
         * @param {Number} y1
         * @param {Number} x2
         * @param {Number} y2
         * @return {Number}
         */
        getDistance: function(x1, y1, x2, y2){
            var dx = x2 - x1;
            var dy = y2 - y1;
            return Math.sqrt(dx*dx + dy*dy);
        },
        getTileDrawData: function(obj, keys){
            keys = keys || this.TILE_DRAW_DATA_KEYS;
            var result = {};

            for(var i = keys.length - 1; i >= 0; i--){
                var key = keys[i];
                result[key] = obj[key];
            }
            return result;
        }
    };

    root.RL.Util = Util;

}(this));
