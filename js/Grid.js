const map_size = 15;

import Tile from './Tile.js'

export default {
    components: {
        Tile
    },
    template: `
    <div class="wrapper">
        <div class="grid-layout">
            <tile 
                v-for="(tile, i) of flatMap"
                v-bind:properties="tile"
                v-bind:key="'tile' + i + tile.x + tile.y"
                class="wall">
            </tile>
        </div>
    </div>
    `,
    data() {
        return {
            tiles: [],
            grid: [ //Grid, used to print tileTexture from selected tileset
                [47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47],
                [47, 16, 47, 16, 16, 16, 16, 16, 47, 47, 16, 16, 16, 16, 47],
                [47, 16, 16, 16, 16, 16, 16, 16, 47, 47, 16, 16, 16, 16, 47],
                [47, 16, 47, 16, 16, 16, 16, 16, 16, 47, 16, 16, 16, 16, 47],
                [47, 16, 47, 16, 16, 16, 16, 47, 16, 47, 47, 47, 16, 47, 47],
                [47, 16, 47, 47, 47, 47, 47, 47, 16, 47, 47, 47, 16, 47, 47],
                [47, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 47, 47],
                [47, 47, 16, 47, 47, 47, 16, 47, 16, 16, 47, 16, 47, 47, 47],
                [47, 47, 16, 47, 16, 16, 16, 47, 47, 16, 47, 16, 16, 16, 47],
                [47, 16, 16, 16, 16, 16, 16, 16, 16, 16, 47, 16, 16, 16, 47],
                [47, 16, 47, 47, 16, 16, 16, 47, 47, 16, 47, 47, 16, 16, 47],
                [47, 16, 16, 16, 47, 47, 47, 47, 47, 16, 16, 16, 16, 16, 47],
                [47, 16, 16, 16, 16, 16, 16, 16, 47, 47, 16, 47, 47, 47, 47],
                [47, 16, 16, 16, 47, 47, 16, 16, 47, 47, 16, 16, 16, 47, 47],
                [47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47]
            ],
            objectGrid: [ //ObjectGrid, to check what Tileset, etc. Could be used for collision
                //'W' = Wall, ' ' = Floor
                ['W','W','W','W','W','W','W','W','W','W','W','W','W','W','W'],
                ['W',' ','W',' ',' ',' ',' ',' ','W','W',' ',' ',' ',' ','W'],
                ['W',' ',' ',' ',' ',' ',' ',' ','W','W',' ',' ',' ',' ','W'],
                ['W',' ','W',' ',' ',' ',' ',' ',' ','W',' ',' ',' ',' ','W'],
                ['W',' ','W',' ',' ',' ',' ','W',' ','W','W','W',' ','W','W'],
                ['W',' ','W','W','W','W','W','W',' ','W','W','W',' ','W','W'],
                ['W',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','W','W'],
                ['W','W',' ','W','W','W',' ','W',' ',' ','W',' ','W','W','W'],
                ['W','W',' ','W',' ',' ',' ','W','W',' ','W',' ',' ',' ','W'],
                ['W',' ',' ',' ',' ',' ',' ',' ',' ',' ','W',' ',' ',' ','W'],
                ['W',' ','W','W',' ',' ',' ','W','W',' ','W','W',' ',' ','W'],
                ['W',' ',' ',' ','W','W','W','W','W',' ',' ',' ',' ',' ','W'],
                ['W',' ',' ',' ',' ',' ',' ',' ','W','W',' ','W','W','W','W'],
                ['W',' ',' ',' ','W','W',' ',' ','W','W',' ',' ',' ','W','W'],
                ['W','W','W','W','W','W','W','W','W','W','W','W','W','W','W']
            ]
        }
    },
    computed: {
        flatMap() {
            return this.tiles.flat();
        }
    },
    methods: {
        setObjectFromId(objectId){
            switch (objectId){
                case ' ': //Floor
                return "Floor"
                case 'W': //Wall
                return "Wall"
            }
        }
    },

    created() {

        for(let row = 0; row < map_size; row++){
            this.tiles[row] = [];
            for (let col = 0; col < map_size; col++){
                let tileId = this.grid[row][col];
                let objectId = this.objectGrid[row][col];
                let properties = {
                    x: col,
                    y: row,
                    tileId: tileId,
                    object: this.setObjectFromId(objectId),
                };
                this.tiles[row].push(properties); //Pushes properties down to child element "Tile"
            }
        }
    },
    mounted() {
        document.documentElement.style.setProperty('--map_size', map_size) //sends --map_size variable to css
    }
}