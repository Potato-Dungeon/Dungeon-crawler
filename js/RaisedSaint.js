export default{
    template:`
        <div ref="RaisedSaint" id="saintSkull" class="sprite"></div>
    `,
    props: {
        position: Object
    },
    data(){
        return{
            hitpoints: 1,
            damage: 1,
        } 
    },
    /*watch:{
        position:{
            deep: true,
            handler(){
                this.newPosition()
            }
        }
    },*/

    methods:{
        setPosition(){
            this.$refs.RaisedSaint.style.setProperty('left', `calc(${this.position.x} * 32px)`)
            this.$refs.RaisedSaint.style.setProperty('top', `calc(${this.position.y} * 32px)`)
        }
    },

    mounted(){
        this.setPosition()
    }
}