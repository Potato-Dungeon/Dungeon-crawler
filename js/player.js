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
            y: 0,
            hitpoints: '10',
            damageOutput: 1
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