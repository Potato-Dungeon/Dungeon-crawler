const map_size = 15;

import Tile from './Tile.js'
import player from './player.js'

export default {
    components: {
        Tile,
        player
    },
    template: `
    <div class="wrapper">
        <div class="grid-layout">
            <tile 
                v-for="(tile, i) of tiles.flat()"
                v-bind:properties="tile"
                v-bind:key="'tile' + i + tile.x + tile.y"
                >
            </tile>
            <player v-bind:position="playerPosition"></player>
        </div>
    </div>
    </div>
    `,
    data() {
        return {
            tiles: [],
            // grid: [ //Grid, used to print tileTexture from selected tileset
            //     [47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47],
            //     [47, 16, 47, 16, 16, 16, 16, 16, 47, 47, 16, 16, 16, 16, 47],
            //     [47, 16, 16, 16, 16, 16, 16, 16, 47, 47, 16, 16, 16, 16, 47],
            //     [47, 16, 47, 16, 16, 16, 16, 16, 16, 47, 16, 16, 16, 16, 47],
            //     [47, 16, 47, 16, 16, 16, 16, 47, 16, 47, 47, 47, 16, 47, 47],
            //     [47, 16, 47, 47, 47, 47, 47, 47, 16, 47, 47, 47, 16, 47, 47],
            //     [47, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 47, 47],
            //     [47, 47, 16, 47, 47, 47, 16, 47, 16, 16, 47, 16, 47, 47, 47],
            //     [47, 47, 16, 47, 16, 16, 16, 47, 47, 16, 47, 16, 16, 16, 47],
            //     [47, 16, 16, 16, 16, 16, 16, 16, 16, 16, 47, 16, 16, 16, 47],
            //     [47, 16, 47, 47, 16, 16, 16, 47, 47, 16, 47, 47, 16, 16, 47],
            //     [47, 16, 16, 16, 47, 47, 47, 47, 47, 16, 16, 16, 16, 16, 47],
            //     [47, 16, 16, 16, 16, 16, 16, 16, 47, 47, 16, 47, 47, 47, 47],
            //     [47, 16, 16, 16, 47, 47, 16, 16, 47, 47, 16, 16, 16, 47, 47],
            //     [47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47]
            // ],
            objectGrid: [ //ObjectGrid, to check what Tileset, etc. Could be used for collision
                //'W' = Wall, ' ' = Floor
                ['W','W','W','W','W','W','W','W','W','W','W','W','W','W','W'],
                ['W',' ','W',' ',' ',' ',' ',' ','W','W',' ',' ',' ',' ','W'],
                ['W',' ',' ',' ',' ',' ',' ',' ','W','W',' ',' ',' ',' ','W'],
                ['W','S','W',' ',' ',' ',' ',' ',' ','W',' ',' ',' ',' ','W'],
                ['W',' ','W',' ',' ',' ',' ','W',' ','W','W','W',' ','W','W'],
                ['W',' ','W','W','W','W','W','W',' ','W','W','W',' ','W','W'],
                ['W',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','W','W'],
                ['W','W',' ','W','W','W',' ','W',' ',' ','W',' ','W','W','W'],
                ['W','W',' ','W',' ',' ',' ','W','W',' ','W',' ',' ',' ','W'],
                ['W',' ',' ',' ',' ',' ',' ',' ',' ',' ','W',' ',' ',' ','W'],
                ['W',' ','W','W',' ',' ',' ','W','W',' ','W','W',' ',' ','W'],
                ['W',' ',' ',' ','W','W','W','W','W',' ',' ',' ',' ',' ','W'],
                ['W',' ',' ',' ',' ',' ',' ',' ','W','W',' ','W','W','W','W'],
                ['W',' ',' ',' ','W','W',' ',' ','W','W',' ',' ',' ','W','W'],
                ['W','W','W','W','W','W','W','W','W','W','W','W','W','W','W']
            ],
    
            playerPosition:{
                x: 5,
                y: 2
            }
           
        }
        /* have to add variables of hero starting position.. ? 
        let heroX = 2,
        let heroY = 2, */
        
        
        
    },
    computed:{
        flatMap(){
            return this.tiles.flat();
        }

    },

    methods: {
        setObjectFromId(objectId){
            switch (objectId){
                case ' ': //Floor
                return "Floor"
                case 'W': //Wall
                return "Wall"
                default:
                return objectId; //User added non-existing symbol in objectGrid
            }
        },

         /* Need to remake the changetexture based on walking
        upgradeTexture(tile){
            console.log('clicked', tile)
            
            this.tiles[tile.y][tile.x].image = this.getTexture(tile, tileId); // original (tile, tileId) alternativt (2)

            this.flatGrid = this.tiles.flat()
        }, */

        /* 
       moveHero(newX, newY){
            this.tiles[newY][newX].image = this.getTexture(2);
            this.tiles[this.heroY][this.heroX].image = this.getTexture(0); 
        },  */

        /* new function to "move" the character, didnt get Johans to work. */ 
        //HeroMovement in the progress 
        moveUp(){

            let newPositionX = this.playerPosition.x;
            let newPositionY = this.playerPosition.y-1;
            if(this.objectGrid[newPositionY][newPositionX] !== 'W'){
                this.playerPosition.y = newPositionY; 
            }
        },
        moveDown(){
            let newPositionX = this.playerPosition.x;
            let newPositionY = this.playerPosition.y+1;
            if(this.objectGrid[newPositionY][newPositionX] !== 'W'){
                this.playerPosition.y = newPositionY;
            }       
        },

        moveLeft(){
            let newPositionY = this.playerPosition.y;
            let newPositionX = this.playerPosition.x-1;
            if(this.objectGrid[newPositionY][newPositionX] !== 'W'){
                this.playerPosition.x = newPositionX
            }

        },
        moveRight(){
            let newPositionX = this.playerPosition.x+1;
            let newPositionY = this.playerPosition.y;
            if(this.objectGrid[newPositionY][newPositionX] !== 'W'){
                this.playerPosition.x = newPositionX;
            }
        }, 
        
    },
    created() {

        for(let row = 0; row < map_size; row++){
            this.tiles[row] = [];
            for (let col = 0; col < map_size; col++){
                //let tileId = this.grid[row][col];
                let tileId; 
                
                switch(this.objectGrid[row][col]){
                    case "W":
                        tileId = 47;
                    break;
                    case " ":
                        tileId = 16;
                    case "S":
                        objectId = RaisedSaint;
                        break;
                } 

                let objectId = this.objectGrid[row][col];
                let properties = {
                    x: col,
                    y: row,
                    tileId: tileId,
                    object: this.setObjectFromId(objectId),
                };
                this.tiles[row].push(properties); //Pushes properties down to child element "Tile"
            }
        }
    },
    mounted() {
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
                if(e.keyCode === 65){
                        this.moveLeft()
                }
                if(e.keyCode === 87){
                    this.moveUp()
                }
                if(e.keyCode === 68){
                    this.moveRight()
                }
                if(e.keyCode === 83){
                    this.moveDown()
                }
            }),
        document.documentElement.style.setProperty('--map_size', map_size) //sends --map_size variable to css
    }
}


