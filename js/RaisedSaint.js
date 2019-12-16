export default{
    props: {
        position: Object
    },
    template:`
        <div ref="RaisedSaint" class="RaisedSaint"></div>
    `,
    data(){
        return{
            hitpoints: 1,
            damage: 1,
            objectID: "S"
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
            this.$refs.RaisedSaint.style.setProperty('left', `calc(${this.position.x} * 32px)`)
            this.$refs.RaisedSaint.style.setProperty('top', `calc(${this.position.y} * 32px)`)
        }
    },

    mounted(){
        this.newPosition()
    }
}