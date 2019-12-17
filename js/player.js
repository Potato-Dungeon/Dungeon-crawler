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
        return{
            backpack:{
                coin: 0,
            }
        }
           
    },
    watch:{
        position:{
            deep: true,
            handler(){
                this.setPosition()
            }
        }
    },

    methods:{
        setPosition(){
            //Updates player's position on the screen
            this.$refs.player.style.setProperty('left', `calc(${this.position.x} * 32px)`)
            this.$refs.player.style.setProperty('top', `calc(${this.position.y} * 32px)`)

            //Adds a gradient circle to limit the view of what the player can see
            this.$refs.shadow.style.setProperty('background', `radial-gradient(circle at calc(${this.position.x} * 32px + 16px) calc(${this.position.y} * 32px + 16px), transparent,black 21%)`)
        },
        addItem(){
            this.backpack.coin +=1;
        }
    },

    mounted(){
        this.newPosition()
    },

    combat(monsterHitpoints, monsterDamageOutput){
        while(monsterHitpoints > 0){
            console.log(this.hitpoints) //Is "undefined" but gives no undefined error.
            monsterHitpoints--
            console.log("Monster lose 1 HP")
            this.hitpoints--
            console.log("Player lose 1 HP")
            if(this.hitpoints == 0){
                alert("You've been defeated!")
                location.reload(); //Reloads the page, restarting the game
            }
        }
    }
}