export default {
    template: `
        <div class="sprite" ref="coin" id="coin">
        </div>
    `,
    props:{
        position: Object
    },
    data() {
        return{
            value: 2,
        }
    },
    methods: {
        setPosition() {
            this.$refs.coin.style.setProperty('left', `calc(${this.position.x} * 32px)`)
            this.$refs.coin.style.setProperty('top', `calc(${this.position.y} * 32px)`)
        }
    },
    mounted() {
        this.setPosition();
    }
}