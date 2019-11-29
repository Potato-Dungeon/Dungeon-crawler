export default {
    template: `
        <span ref="tile" class="tile" @click="logPosition">
            <img src="/assets/temptxt.png" width="64px">
        </span>
        `,
    data() {
        return {
            
        }
    },
    methods: {
        logPosition() {
            console.log(this.position.x, this.position.y);
        }
    },
    props: ['position'],
    mounted() {
        this.$refs.tile.style.setProperty('background-image', `url(${this.position.img})`)
    }
}