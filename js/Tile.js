export default {
    template: `
        <span ref="tile" class="tile" @click="logPosition">
            <img :src="this.texture" width="64px">
        </span>
        `,
    props: ['position'],
    data() {
        return {
            texture: '/assets/temptxt.png',
            graphics: [
                {
                    textureId: 0,
                    texture: '/assets/temptxt.png'
                },
                {
                    textureId: 1,
                    texture: 'assets/temptxt2.png'
                }
            ]
        }
    },
    methods: {
        logPosition() {
            console.log(this.position.x, this.position.y);
        },
        updateBlock(blockTexture) {
            this.texture = blockTexture;
        }
    },
    mounted() {
        this.$refs.tile.style.setProperty('background-image', `url(${this.position.image})`)
    }
}