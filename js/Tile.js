const size = 64;

export default {
    template: `
        <div ref="tile" 
        class="tile" 
        @click="logPosition">
            <h3></h3>
        </div>
        `,
    props: ['properties', 'type', 'image'],
    methods: {
        logPosition() {
            console.log(this.properties.x, this.properties.y, this.properties.type);
        }
    },
    mounted() {
        this.$refs.tile.style.setProperty('background-image', `url(${this.properties.image})`);
        document.documentElement.style.setProperty('--size', size + "px");
    }
}