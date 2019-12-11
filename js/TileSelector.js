import Tile from './Tile.js'

export default {
    components: {
        Tile
    },
    template: `
    <div class="tile-selector">
        Selector
        <tile v-bind:properties="{'type': 'selectorTile', 'image': '/assets/temptxt.png', 'tileId': '0'}"></tile>
        <tile v-bind:properties="{'type': 'selectorTile', 'image': '/assets/temptxt2.png', 'tileId': '1'}"></tile>
    </div>
    `,
    methods: {
    },
    mounted() {
        
    }
}