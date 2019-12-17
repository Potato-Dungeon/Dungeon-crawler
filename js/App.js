import Grid from './Grid.js'

export default {
    /*
    Program being run using this file
    */
    components: {
        Grid
    },
    template: `
    <div id="pageBorder">
        <!--Header-->
        <h1 id="title"><b>Potato Dungeon</b></h1>
        <!--Game Logic-->
        <grid></grid>
    </div>
    `
}