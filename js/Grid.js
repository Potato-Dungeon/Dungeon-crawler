import Tile from './Tile.js'

export default {
    components: {
        Tile
    },
    template: `
    <div class="grid-layout">
        <tile 
            v-for="(tile, i) of flatMap"
            v-bind:position="tile"
            v-bind:key="'tile' + i + tile.x + tile.y">
        </tile>
    </div>
    `,
    data() {
        return {
            testMap: [
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
            tiles: []
        }
    },
    computed: {
        flatMap() {
            return this.testMap.flat();
        }
    },
    created() {

        for(let row = 0; row < 15; row++){
            //this.testMap[row] = [];
            for (let col = 0; col < 15; col++){
                let position = {
                    x: col,
                    y: row
                };
                this.testMap[row][col] = position;
            }
        }

        for (let y = 0; y < 15; y++){
            for (let x = 0; x < 15; x++){
                
                //How to check the value of something in a 2d array
                  if (this.testMap[x][y] == 1){
                    console.log("I AM A 1");
                    //console.log(position);
                }
            }
        }
    }
}