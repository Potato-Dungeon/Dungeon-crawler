
export default {
    template: `
        <div class="entity" ref="entity">
        </div>
    `,
      props:{
        position: Object
    },
    data(){
        return{
            coin:{
                value: 2,
                x: 0,
                y: 0
            },
            apple:{
                x: 0,
                y: 0
            }
        }
    },
    methods: {
        setPosition() {
            this.$refs.entity.style.setProperty('left', `calc(${this.position.x} * 32px)`)
            this.$refs.entity.style.setProperty('top', `calc(${this.position.y} * 32px)`)
        }
        
    },
    mounted() {
        this.setPosition();
    }
}