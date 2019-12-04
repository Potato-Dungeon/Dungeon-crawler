const map_width = 15;
const map_height = 15;

import Tile from './Tile.js'

export default {
    components: {
        Tile
    },
    template: `
    <div id="container">
    <div class="grid-layout">
        <tile 
            v-for="(tile, i) of flatGrid"
            v-bind:properties="tile"
            v-bind:key="'tile' + i + tile.x + tile.y"
            v-bind:class="'tile-tileType-' + tile.tileType"
            v-on:change-background="upgradeTexture">
        </tile>
    </div>
    </div>
    `,
    data() {
        return {
            flatGrid:[],
            tiles: [],
            grid: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            graphics: [
                {
                    textureId: 0,
                    texture: '/assets/temptxt.png'
                },
                {
                    textureId: 1,
                    texture: 'assets/temptxt2.png'
                }
            ]
        }
    },
    methods: {
        getTexture(tileId) {
            if (this.graphics[0].textureId === tileId){
                return this.graphics[0].texture;
            }
            else if (this.graphics[1].textureId === tileId){
                return this.graphics[1].texture;
            }

            
        },
       
        upgradeTexture(tile){
            console.log('clicked', tile)
            
            this.tiles[tile.y][tile.x].image = this.getTexture(tile.tileId)

            this.flatGrid = this.tiles.flat() /* Use anytime we want to upgrade*/
        }
    },

    created() {

        for(let row = 0; row < map_width; row++){
            this.tiles[row] = [];
            for (let col = 0; col < map_height; col++){
                let tileId = this.grid[row][col];
                let properties = {
                    x: col,
                    y: row,
                    tileId: tileId,
                    image: this.getTexture(tileId)
                };
                this.tiles[row].push(properties); //Pushes properties down to child element "Tile"
            }
        }
        this.flatGrid = this.tiles.flat()
    },
    mounted() {
        document.documentElement.style.setProperty('--width', map_width) //Sets a variable "--width" to be used in css style.css
    }

}