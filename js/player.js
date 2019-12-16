export default{
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
            //Updates player's position on the screen
            this.$refs.player.style.setProperty('left', `calc(${this.position.x} * 32px)`)
            this.$refs.player.style.setProperty('top', `calc(${this.position.y} * 32px)`)

            //Adds a gradient circle to limit the view of what the player can see
            this.$refs.shadow.style.setProperty('background', `radial-gradient(circle at calc(${this.position.x} * 32px + 16px) calc(${this.position.y} * 32px + 16px), transparent,black 21%)`)
        },
        addToBackpack() { //take item from props and push it to backpack. Prints out name of backpack in log
            this.backpack.push(item);
            console.log(`item ${item} has been added to backpack`)
        }
    },

    mounted(){
        this.newPosition()
    }
}