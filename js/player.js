export default{
    props: ['position'],

    template:`
    <div ref="shadow" class="shadow-overlay">
        <div ref="player" id="player"></div>
    </div>
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

            this.$refs.shadow.style.setProperty('background', `radial-gradient(circle at calc(${this.position.x} * 32px) calc(${this.position.y} * 32px), transparent,black, black, black, black)`)
        }
    },

    mounted(){
        this.newPosition()
    }
}