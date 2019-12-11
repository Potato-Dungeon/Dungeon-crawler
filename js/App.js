import Grid from './Grid.js'
import TileSelector from './TileSelector.js'

export default {
    components: {
        Grid,
        TileSelector
    },
    template: `
    <div>
        <TileSelector ref="tile-selector"></TileSelector>
        <grid></grid>
    </div>
    `
}