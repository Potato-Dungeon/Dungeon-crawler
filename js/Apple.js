export default {
    template: `
        <div class="sprite" ref="apple" id="apple">
        </div>
    `,
    props:{
        position: Object
    },
    data() {
        return{
            pos:{
                x: this.position.x,
                y: this.position.y
            },
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