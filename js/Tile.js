import { getTexture } from './utils.js'

export default {
    template: `
        <div ref="tile" 
        class="tile sprite" 
        @click="setTileTexture">
            <h3></h3>
        </div>
        `,
    props: ['properties'],
    data() {
        return {
            tileId: this.properties.tileId
        }
    },
    methods: {
        logPosition() {
            console.log(this.properties.x, this.properties.y, this.properties.tileId);
        },
        setTileTexture() {
            let pos;
            switch(this.tileId){ //Working on a system to read from tileset and set position in the image to be shown as a tile Image.
                case 0:
                    pos = {x: 1, y: 0};
                    break;
                case 1:
                    pos = {x: 2, y: 0};
                    break;
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