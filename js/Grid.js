const map_size = 15;

import Tile from './Tile.js'

export default {
    components: {
        Tile
    },
    template: `
    <div class="grid-layout">
        <tile 
            v-for="(tile, i) of flatMap"
            v-bind:properties="tile"
            v-bind:key="'tile' + i + tile.x + tile.y"
            class="wall">
        </tile>
    </div>
    `,
    data() {
        return {
            tiles: [],
            grid: [ //Our grid at the moment
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1],
                [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1],
                [1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
                [1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1],
                [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1],
                [1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            objectGrid: [ //ObjectGrid, to check what Tileset, etc. Could be used for collision
                //1 = Wall, 0 = Floor
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1],
                [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1],
                [1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
                [1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1],
                [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1],
                [1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        }
    },
    computed: {
        flatMap() {
            return this.tiles.flat();
        }
    },
    methods: {
        getObjectFromId(objectId){
            switch (objectId){
                case 0: //Floor
                return "Floor"
                case 1: //Wall
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
                    object: this.getObjectFromId(objectId),
                };
                this.tiles[row].push(properties); //Pushes properties down to child element "Tile"
            }
        }
    },
    mounted() {
        document.documentElement.style.setProperty('--map_size', map_size) //Sets a variable "--width" to be used in css style.css        document.documentElement.style.setProperty('--height', map_height) //Sets a variable "--height" to be used in css style.css
    }
}