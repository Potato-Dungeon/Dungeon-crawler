export default{
    template:`
        <div ref="PriestBoss" id="priestBoss" class="sprite"></div> 
    `,
    props: {
        position: Object
    },
    data(){
        return{
            pos: {
                x: this.position.x,
                y: this.position.y
            },
            hitpoints: 1, //Might not be used
            damage: 1,
        } 
    },

    methods:{
        setPosition(){
            this.$refs.PriestBoss.style.setProperty('left', `calc(${this.position.x} * 32px)`)
            this.$refs.PriestBoss.style.setProperty('top', `calc(${this.position.y} * 32px)`)
        }
    },

    mounted(){
        this.setPosition()
    }
}