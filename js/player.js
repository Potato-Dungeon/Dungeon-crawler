export default{
    //props: ['position'],
    props: {
        position: Object,
        item: Object
    },
    template:`
    <div ref="shadow" class="shadow-overlay">
        <div ref="player" id="player" class="sprite">
        </div>
    </div>
    `,
    data(){
        return {
            backpack: []
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

            this.$refs.shadow.style.setProperty('background', `radial-gradient(circle at calc(${this.position.x} * 32px + 16px) calc(${this.position.y} * 32px + 16px), transparent,black 21%)`)
        },
        addToBackpack() {
            this.backpack.push(item);
            console.log(`item ${item} has been added to backpack`)
        }
    },

    mounted(){
        this.newPosition()
    }
}