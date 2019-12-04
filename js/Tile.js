import { getTexture } from './utils.js'

export default {
    //v-bind:class checks for object name and uses tileset according to object
    template: `
        <div ref="tile" 
        class="tile sprite" 
        @click="setTileTexture"
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
        setTileTexture() {
            let pos;
            switch(this.object){
                case "Wall":

                    switch(this.tileId){ //Working on a system to read from tileset and set position in the image to be shown as a tile Image.
                        case 0:
                        pos = {x: 2, y: 4};
                        break;
                        case 1:
                        pos = {x: 7, y: 5};
                        break;
                    }
                break
                
                case "Floor":
                    switch(this.tileId){
                        case 0:
                        pos = {x: 1, y: 0};
                        break
                    }
                break
            }

            this.changeTexture(pos)
        },
        changeTexture(pos){
            this.$refs.tile.style.backgroundPosition = getTexture(pos.x, pos.y);
        }
    },
    mounted() {
        //this.$refs.tile.style.setProperty('background-position', setTileTexture(tileId))
        //this.$refs.tile.style.setProperty('background-image', `url(${this.properties.image})`);
        document.documentElement.style.setProperty('--tile_size', 32 + "px"); //Sets a "--size" variable to be used in css style.css
    }
}