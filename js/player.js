export default{
    props: ['position'],

    template:`
        <div ref="player" class="player"></div>
    `,
    data(){
        return{
            x: 0,
            y: 0
        } 
    },
    watch:{
        position:{
            deep: true,
            handler(){
                this.newPosition()
            }
        }
    },

    methods:{
        newPosition(){
            this.$refs.player.style.setProperty('left', `calc(${this.position.x} * 32px)`)
            this.$refs.player.style.setProperty('top', `calc(${this.position.y} * 32px)`)
        }
    },

    mounted(){
        this.newPosition()
    }
}