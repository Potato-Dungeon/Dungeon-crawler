import { getTexture } from './utils.js'

export default {
    //v-bind:class checks for object name and uses tileset according to object
    template: `
        <div ref="tile" 
        class="tile sprite" 
        @click="logPosition"
        v-bind:class="{ 
             wall: object === 'Wall',
             floor: object === 'Floor'
            }">
            <h3></h3>
        </div>
        `,
    props: {
        properties: Object
    },
    data() {
        return {
            tileId: this.properties.tileId,
            object: this.properties.object
        }
    },
    methods: {
        logPosition() {
            console.log(this.properties.x, this.properties.y, this.properties.tileId, this.properties.object);
        },
        setTileTexture() { //This is going to be huge but... Eh. It does what it does
            let pos;
            switch(this.object){
                case "Wall": //40 cases for Walltiles
                    switch(this.tileId){ //Working on a system to read from tileset and set position in the image to be shown as a tile Image.
                        case 0: //transparent
                        pos = {x: 0, y: 0};
                        break;
                        case 1: //Full Left-right-bottom
                        pos = {x: 1, y: 0};
                        break;
                        case 2: //Full Top-right-bottom
                        pos = {x: 2, y: 0};
                        break;
                        case 3: //Full Right-bottom corner Left
                        pos = {x: 3, y: 0};
                        break;
                        case 4: //Full Right-bottom
                        pos = {x: 4, y: 0};
                        break;
                        case 5: //Full Top-left-bottom
                        pos = {x: 5, y: 0};
                        break;
                        case 6: //Full Left-bottom corner Right
                        pos = {x: 6, y: 0};
                        break;
                        case 7: //Full Left-bottom
                        pos = {x: 7, y: 0};
                        break;
                        case 8: //Full Top-bottom
                        pos = {x: 0, y: 1};
                        break;
                        case 9: //Full Bottom corner Left-right
                        pos = {x: 1, y: 1};
                        break;
                        case 10: //Full Bottom corner Right
                        pos = {x: 2, y: 1};
                        break;
                        case 11: //Full Bottom corner Left
                        pos = {x: 3, y: 1};
                        break;
                        case 12: //Full Bottom
                        pos = {x: 4, y: 1};
                        break;
                        case 13: //Full Top-left-right
                        pos = {x: 5, y: 1};
                        break;
                        case 14: //Full Left-right
                        pos = {x: 6, y: 1};
                        break;
                        case 15: //Full Left-corner
                        pos = {x: 7, y: 1};
                        break;
                        case 16: //Full Right half Left corner Left
                        pos = {x: 0, y: 2};
                        break;
                        case 17: //Full Right half Left
                        pos = {x: 1, y: 2};
                        break;
                        case 18: //Full Right-corner
                        pos = {x: 2, y: 2};
                        break;
                        case 19: //Full Left half Right corner Right
                        pos = {x: 3, y: 2};
                        break;
                        case 20: //Full Left half Right
                        pos = {x: 4, y: 2};
                        break;
                        case 21: //Full Top half Left-right
                        pos = {x: 5, y: 2};
                        break;
                        case 22: //half Left-right corner Left-right
                        pos = {x: 6, y: 2};
                        break;
                        case 23: //half Left-right corner Left
                        pos = {x: 7, y: 2};
                        break;
                        case 24: //half Left-right corner Right
                        pos = {x: 0, y: 3};
                        break;
                        case 25: //half Left-right
                        pos = {x: 1, y: 3};
                        break;
                        case 26: //Full Top-right
                        pos = {x: 2, y: 3};
                        break;
                        case 27: //Full Right corner Left
                        pos = {x: 3, y: 3};
                        break;
                        case 28: //Full Right
                        pos = {x: 4, y: 3};
                        break;
                        case 29: //Full Top half right
                        pos = {x: 5, y: 3};
                        break;
                        case 30: //half Right corner Left-right
                        pos = {x: 6, y: 3};
                        break;
                        case 31: //half Right corner Right
                        pos = {x: 7, y: 3};
                        break; 
                        case 32: //half Right corner Left
                        pos = {x: 0, y: 4};
                        break;
                        case 33: //half Right
                        pos = {x: 1, y: 4};
                        break;
                        case 34: //Full Top-left
                        pos = {x: 2, y: 4};
                        break;
                        case 35: //Full Left corner right
                        pos = {x: 3, y: 4};
                        break;
                        case 36: //Full Left
                        pos = {x: 4, y: 4};
                        break;
                        case 37: //Full Top half Left
                        pos = {x: 5, y: 4};
                        break;
                        case 38: //half Left corner Left-right
                        pos = {x: 6, y: 4};
                        break;
                        case 39: //half Left corner Right
                        pos = {x: 7, y: 4};
                        break;
                        case 40: //half Left corner Left
                        pos = {x: 0, y: 5};
                        break;
                        case 41: //half Left
                        pos = {x: 1, y: 5};
                        break;
                        case 42: //Full Top
                        pos = {x: 2, y: 5};
                        break;
                        case 43: //corner Left-right
                        pos = {x: 3, y: 5};
                        break;
                        case 44: //corner Right
                        pos = {x: 4, y: 5};
                        break;
                        case 45: //corner Left
                        pos = {x: 5, y: 5};
                        break;
                        case 46: //empty
                        pos = {x: 6, y: 5};
                        break;
                        case 47: //Full block
                        pos = {x: 7, y: 5};
                        break;
                    }
                break;
                
                case "Floor": //17 cases for Floortiles
                    switch(this.tileId){
                        case 0: //transparent
                        pos = {x: 0, y: 0};
                        break;
                        case 1: //empty
                        pos = {x: 1, y: 0};
                        break;
                        case 2: //Top
                        pos = {x: 2, y: 0};
                        break;
                        case 3: //Left
                        pos = {x: 3, y: 0};
                        break;
                        case 4: //Top-left
                        pos = {x: 4, y: 0};
                        break;
                        case 5: //Right
                        pos = {x: 0, y: 1};
                        break;
                        case 6: //Top-right
                        pos = {x: 1, y: 1};
                        break;
                        case 7: //Left-right
                        pos = {x: 2, y: 1};
                        break;
                        case 8: //Top-left-right
                        pos = {x: 3, y: 1};
                        break;
                        case 9: //Bottom
                        pos = {x: 4, y: 1};
                        break;
                        case 10: //Top-bottom
                        pos = {x: 0, y: 2};
                        break;
                        case 11: //Left-bottom
                        pos = {x: 1, y: 2};
                        break;
                        case 12: //Top-left-bottom
                        pos = {x: 2, y: 2};
                        break;
                        case 13: //Right-bottom
                        pos = {x: 3, y: 2};
                        break;
                        case 14: //Top-right-bottom
                        pos = {x: 4, y: 2};
                        break;
                        case 15: //Left-right-bottom
                        pos = {x: 0, y: 3};
                        break;
                        case 16: //All edges
                        pos = {x: 1, y: 3};
                        break;
                    }
                break;
            }

            this.changeTexture(pos);
        },
        changeTexture(pos){
            this.$refs.tile.style.backgroundPosition = getTexture(pos.x, pos.y, 32);
        }
    },
    created() {
        //this.$refs.tile.style.setProperty('background-position', setTileTexture(tileId))
        //this.$refs.tile.style.setProperty('background-image', `url(${this.properties.image})`);
        document.documentElement.style.setProperty('--tile_size', 32 + 'px'); //Sets a "--size" variable to be used in css style.css
    },
    mounted() {
        this.setTileTexture()
    }
}