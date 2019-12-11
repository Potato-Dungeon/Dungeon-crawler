const map_size = 15;

import Tile from './Tile.js'

export default {
    components: {
        Tile
    },
    template: `
    <div class="wrapper">
        <div class="grid-layout">
            <tile 
                v-for="(tile, i) of flatMap"
                v-bind:properties="tile"
                v-bind:key="'tile' + i + tile.x + tile.y"
                class="wall">
            </tile>
        </div>
    </div>
    </div>
    `,
    data() {
        return {
            flatGrid:[],
            tiles: [],
            grid: [ //Grid, used to print tileTexture from selected tileset
                [47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47],
                [47, 16, 47, 16, 16, 16, 16, 16, 47, 47, 16, 16, 16, 16, 47],
                [47, 16, 16, 16, 16, 16, 16, 16, 47, 47, 16, 16, 16, 16, 47],
                [47, 16, 47, 16, 16, 16, 16, 16, 16, 47, 16, 16, 16, 16, 47],
                [47, 16, 47, 16, 16, 16, 16, 47, 16, 47, 47, 47, 16, 47, 47],
                [47, 16, 47, 47, 47, 47, 47, 47, 16, 47, 47, 47, 16, 47, 47],
                [47, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 47, 47],
                [47, 47, 16, 47, 47, 47, 16, 47, 16, 16, 47, 16, 47, 47, 47],
                [47, 47, 16, 47, 16, 16, 16, 47, 47, 16, 47, 16, 16, 16, 47],
                [47, 16, 16, 16, 16, 16, 16, 16, 16, 16, 47, 16, 16, 16, 47],
                [47, 16, 47, 47, 16, 16, 16, 47, 47, 16, 47, 47, 16, 16, 47],
                [47, 16, 16, 16, 47, 47, 47, 47, 47, 16, 16, 16, 16, 16, 47],
                [47, 16, 16, 16, 16, 16, 16, 16, 47, 47, 16, 47, 47, 47, 47],
                [47, 16, 16, 16, 47, 47, 16, 16, 47, 47, 16, 16, 16, 47, 47],
                [47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47]
            ],
            objectGrid: [ //ObjectGrid, to check what Tileset, etc. Could be used for collision
                //'W' = Wall, ' ' = Floor
                ['W','W','W','W','W','W','W','W','W','W','W','W','W','W','W'],
                ['W',' ','W',' ',' ',' ',' ',' ','W','W',' ',' ',' ',' ','W'],
                ['W',' ',' ',' ',' ',' ',' ',' ','W','W',' ',' ',' ',' ','W'],
                ['W',' ','W',' ',' ',' ',' ',' ',' ','W',' ',' ',' ',' ','W'],
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
            ]
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
        moveHero(newX, newY){
            this.tiles[newY][newX].image = this.getTexture(2);
            this.tiles[this.heroY][this.heroX].image = this.getTexture(0);
        },  
        /* new function to "move" the character, didnt get Johans to work. */ 
        //HeroMovement in the progress 
        moveUp(){

            let newPositionX = this.heroX;
            let newPositionY = this.heroY-1;
            console.log("moveUp");
                this.moveHero(newPositionX, newPositionY);
            if(this.grid[newPositionY][newPositionX] !== 1){
                this.heroY = newPositionY;  
                console.log(newPositionX, newPositionY)    
        },
            }
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
            console.log("moveLeft");
            let newPositionY = this.heroY;
            if(this.grid[newPositionY][newPositionX] !== 1){
                this.moveHero(newPositionX, newPositionY);
                console.log(newPositionX, newPositionY)
                this.heroX = newPositionX;

            }

        },
        moveRight(){
            let newPositionX = this.heroX+1;
            let newPositionY = this.heroY;
            console.log("moveRight");
                this.moveHero(newPositionX, newPositionY);
            if(this.grid[newPositionY][newPositionX] !== 1){
                this.heroX = newPositionX;
                console.log(newPositionX, newPositionY)
            }
        upgradeTexture(tile){
            console.log('clicked', tile)
            
            this.tiles[tile.y][tile.x].image = this.getTexture(tile, tileId); // original (tile, tileId) alternativt (2)

        },
            this.flatGrid = this.tiles.flat() 

        }
    },

    created() {

        for(let row = 0; row < map_size; row++){
            this.tiles[row] = [];
            for (let col = 0; col < map_size; col++){
                let tileId = this.grid[row][col];
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
        this.flatGrid = this.tiles.flat()
    },
    mounted() {
        // EventListener for reaction on keyup 
        window.addEventListener('keyup', (e) => {
                if(e.keyCode === 37){
                }
                    this.moveLeft()
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
        document.documentElement.style.setProperty('--map_size', map_size) //sends --map_size variable to css
    }
}
