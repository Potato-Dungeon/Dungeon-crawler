const map_width = 15;
const map_height = 15;

import Tile from './Tile.js'

export default {
    components: {
        Tile
    },
    template: `
    <div id="container">
    <div class="grid-layout">
        <tile 
            v-for="(tile, i) of flatGrid"
            v-bind:properties="tile"
            v-bind:key="'tile' + i + tile.x + tile.y"
            v-bind:class="'tile-tileType-' + tile.tileType"
            v-on:change-background="upgradeTexture">
        </tile>
    </div>
    </div>
    `,
    data() {
        return {
            flatGrid:[],
            tiles: [],
            grid: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1],
                [1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1],
                [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1],
                [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            graphics: [
                {
                    textureId: 0,
                    texture: '/assets/temptxt.png'
                },
                {
                    textureId: 1,
                    texture: 'assets/temptxt2.png'
                },
                {         /*Add/set the hero image to the board. */
                    textureId: 2,
                    texture: 'assets/main-character.png'
                },
                /*
                {
                    textureId: 3,
                    texture: '' (enemy)
                },
                {
                    textureId: 4,
                    texture: '' (chest/goldCoin)
                } */
                
               
            ],
            // Add fixed Hero start position.. Incase we need it. 
            heroX: 1,
            heroY: 5,
            
        }
    },

    methods: {
        getTexture(tileId) {
            if (this.graphics[0].textureId === tileId){
                return this.graphics[0].texture;
            }
            else if (this.graphics[1].textureId === tileId){
                return this.graphics[1].texture;
            }

            /* Added the graphics for the Hero*/
            else if (this.graphics[2].textureId === tileId){
                return this.graphics[2].texture;
            }

            
        },
       
        /* Use anytime we want to upgrade*/
        upgradeTexture(tile){
            console.log('clicked', tile)
            
            this.tiles[tile.y][tile.x].image = this.getTexture(tile, tileId); // original (tile, tileId) alternativt (2)

            this.flatGrid = this.tiles.flat() 
        },
        /* new function to "move" the character, didnt get Johans to work. */ 
        moveHero(newX, newY){
            this.tiles[newY][newX].image = this.getTexture(2);
            this.tiles[this.heroY][this.heroX].image = this.getTexture(0);
        },  


        //HeroMovement in the progress 
        moveUp(){
            let newPositionX = this.heroX;
            let newPositionY = this.heroY-1;
            console.log("moveUp");
            if(this.grid[newPositionY][newPositionX] !== 1){
                this.moveHero(newPositionX, newPositionY);
                this.heroY = newPositionY;  
                console.log(newPositionX, newPositionY)    
            }
        },

        moveDown(){
            let newPositionX = this.heroX;
            let newPositionY = this.heroY+1;
            console.log("moveDown");
            if(this.grid[newPositionY][newPositionX] !== 1){
                this.moveHero(newPositionX, newPositionY);
                this.heroY = newPositionY;
                console.log(newPositionX, newPositionY)
            }       
        },

        moveLeft(){
            let newPositionX = this.heroX-1;
            let newPositionY = this.heroY;
            console.log("moveLeft");
            if(this.grid[newPositionY][newPositionX] !== 1){
                this.moveHero(newPositionX, newPositionY);
                this.heroX = newPositionX;
                console.log(newPositionX, newPositionY)

            }
        },

        moveRight(){
            let newPositionX = this.heroX+1;
            let newPositionY = this.heroY;
            console.log("moveRight");
            if(this.grid[newPositionY][newPositionX] !== 1){
                this.moveHero(newPositionX, newPositionY);
                this.heroX = newPositionX;
                console.log(newPositionX, newPositionY)
            }
        }
    },

    created() {

        for(let row = 0; row < map_width; row++){
            this.tiles[row] = [];
            for (let col = 0; col < map_height; col++){
                let tileId = this.grid[row][col];
                let properties = {
                    x: col,
                    y: row,
                    tileId: tileId,
                    image: this.getTexture(tileId)
                };
                this.tiles[row].push(properties); //Pushes properties down to child element "Tile"
            }
        }
        this.flatGrid = this.tiles.flat()
    },
    mounted() {
        document.documentElement.style.setProperty('--width', map_width); //Sets a variable "--width" to be used in css style.css


        // EventListener for reaction on keyup 
        window.addEventListener('keyup', (e) => {
                if(e.keyCode === 37){
                    this.moveLeft()
                }
                if(e.keyCode === 38){
                    this.moveUp()
                }
                if(e.keyCode === 39){
                    this.moveRight()
                }
                if(e.keyCode === 40){
                    this.moveDown()
                }
            })
    }
}
