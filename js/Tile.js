const size = 42;

export default {
    template: `
        <div ref="tile" 
        class="tile" 
        @click="logPosition">
            <h3></h3>
        </div>
        `,
    props: ['properties'],
    data() {
        return {
            /*srcRect: { //position of the tileset, taken from XNA C# monogame development
                x: 0,
                y: 0
            },*/
            tileId: this.properties.tileId
        }
    },
    methods: {
        logPosition() {
            console.log(this.properties.tileId)
            
            if(this.properties.tileId === 0){
                this.properties.tileId = 1
                this.$emit('change-background', this.properties)
            
            }else if(this.properties.tileId === 1){
                this.properties.tileId = 0
                this.$emit('change-background', this.properties)
                   
            }
            console.log(this.properties.x, this.properties.y, this.properties.tileId);
        },
        setTileTexture() {
            let pos = {x, y};
            switch(tileId){ //Working on a system to read from tileset and set position in the image to be shown as a tile Image.
                case 0:
                    return pos = {x: 32, y: 0};
                case 1:
                    return pos = {x: 64, y: 0};
            }
        }
    },

    watch:{
        properties:{
            deep: true,
            handler(){
                this.$refs.tile.style.setProperty('background-image', `url(${this.properties.image})`);

            }
        }
    },

    mounted() {
        this.$refs.tile.style.setProperty('background-image', `url(${this.properties.image})`);
        document.documentElement.style.setProperty('--size', size + "px"); //Sets a "--size" variable to be used in css style.css
    }
}