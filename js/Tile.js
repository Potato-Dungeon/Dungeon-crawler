export default {
    template: `
        <span ref="tile" 
        class="tile" 
        @click="logPosition" 
        @change="updateTile">
            <img :src="this.texture" width="64px">
        </span>
        `,
    props: ['properties', 'type', 'image'],
    data() {
        return {
            texture: '',
        }
    },
    methods: {
        logPosition() {
            console.log(this.properties.x, this.properties.y, this.properties.type);
        },
        updateTile(){
            texture = this.properties.image;
        }
    },
    mounted() {
        this.$refs.tile.style.setProperty('background-image', `url(${this.properties.image})`)
    }
}