import Tile from './Tile.js'

export default {
    components: {
        Tile
    },
    template: `
    <div class="grid-layout">
        <div class="row">
            <tile 
                v-for="(tile, i) of flatMap"
                v-bind:properties="tile"
                v-bind:key="'tile' + i + tile.x + tile.y"
                v-bind:class="'tile-type-' + tile.type"
                class="column">
            </tile>
        </div>
    </div>
    `,
    data() {
        return {
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
    computed: {
        flatMap() {
            return this.tiles.flat();
        }
    },
    methods: {
        getTexture(type) {
            if (this.graphics[0].textureId === type){
                return this.graphics[0].texture;
            }
            else if (this.graphics[1].textureId === type){
                return this.graphics[1].texture;
            }
        }
    },

    created() {

        for(let row = 0; row < 15; row++){
            this.tiles[row] = [];
            for (let col = 0; col < 15; col++){
                let type = this.grid[row][col];
                let properties = {
                    x: col,
                    y: row,
                    type: type,
                    image: this.getTexture(type)
                };
                this.tiles[row].push(properties);
            }
        }
    }
}