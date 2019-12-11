export default{
    template: `
        <div>
        </div>
    `,
    props: {

    },
    data(){
        return{
            type: "Monster",
            variants: [
                {
                    variantId: 1,
                    variantSprite: "./assets/holyFlame.png",
                    hitpoints: 1,
                    damage: 1
                },
                {
                    variantId: 2,
                    variantSprite: "./assets/raisedSaint.png",
                    hitpoints: 3,
                    damage: 2
                },
                {
                    variantId: 3,
                    variantSprite: "./assets/bossInquisitor.png",
                    hitpoints: 10,
                    damage: 4
                }
            ]
        }

    },
    methods:{
        
    }
}

/*class Monster extends Creature{
    constructor(hitpoints, damageOutput){
        super(hitpoints, damageOutput)
    }
}*/