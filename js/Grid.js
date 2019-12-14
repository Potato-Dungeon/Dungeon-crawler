const map_size = 15;

import Tile from './Tile.js'
import player from './player.js'
import coin from './Coin.js'
import { levels } from './levels.js'

export default {
    components: {
        Tile,
        player,
        coin
    },
    template: `
    <div class="wrapper">
        <div class="grid-layout">
            <tile 
                v-for="(tile, i) of flatMap"
                v-bind:properties="tile"
                v-bind:key="'tile' + i + tile.x + tile.y"
                >
            </tile>
            <player v-bind:position="playerPosition"></player>
            <coin 
                v-for="(coin, i) of coins"
                v-bind:position="coin"
                v-bind:key="'coin' + i + coin.x + coin.y"
            ></coin>
        </coin>
        </div>
    </div>
    </div>
    `,
    data() {
        return {
            level: 0,
            tiles: [],
            grid: levels[0],
            playerPosition:{
                x: 0,
                y: 0
            },
            coins: [],
            isEntity: false
        }
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
                return objectId; //User added non-existing symbol in grid
            }
        },
        moveUp(){
            let newPositionX = this.playerPosition.x;
            let newPositionY = this.playerPosition.y-1;
            if(this.grid[newPositionY][newPositionX] !== 'W'){
                this.playerPosition.y = newPositionY; 
            }
        },

        moveDown(){
            let newPositionX = this.playerPosition.x;
            let newPositionY = this.playerPosition.y+1;
            if(this.grid[newPositionY][newPositionX] !== 'W'){
                this.playerPosition.y = newPositionY;
            }       
        },

        moveLeft(){
            let newPositionY = this.playerPosition.y;
            let newPositionX = this.playerPosition.x-1;
            if(this.grid[newPositionY][newPositionX] !== 'W'){
                this.playerPosition.x = newPositionX
            }

        },
        moveRight(){
            let newPositionX = this.playerPosition.x+1;
            let newPositionY = this.playerPosition.y;
            if(this.grid[newPositionY][newPositionX] !== 'W'){
                this.playerPosition.x = newPositionX;
            }
        },

        nextLevel(){
            this.level++;

            if (this.level > levels.length)this.level = 0;
            this.grid = levels[this.level];
            this.updateTiles();
        },


        updateTiles() {
            for(let row = 0; row < this.grid.length; row++){
                this.tiles[row] = [];
                for (let col = 0; col < this.grid[0].length; col++){
                    //let tileId = this.grid[row][col];
                    let tileId; 
                    tileId = 16;
                    switch(this.grid[row][col]){
                        case "W":
                            tileId = 47;
                            break;
                        case " ":
                            tileId = 16;
                            break;
                        case "S":
                            objectId = RaisedSaint;
                            this.grid[row][col] = ' ';
                            break;
                        case "X":
                            tileId = 16;
                            this.playerPosition.x = col;
                            this.playerPosition.y = row;
                            this.grid[row][col] = ' ';
                            break;
                        case "c":
                            this.grid[row][col] = ' ';
                            this.isEntity = true;
                            break;
                    } 
    
                    let objectId = this.grid[row][col];
                    let properties = {
                        x: col,
                        y: row,
                        tileId: tileId,
                        object: this.setObjectFromId(objectId),
                    };
                    this.tiles[row].push(properties); //Pushes properties down to child element "Tile"
                    if (this.isEntity){
                        let position = {x: col, y: row};
                        this.coins.push(position);
                        console.log(position)
                        this.isEntity = false;
                    }
                }
            }
        }
    },
    created() {
        this.updateTiles();
    },
    mounted() {
        // EventListener for reaction on keyup 
        window.addEventListener('keyup', (e) => {
                switch(e.keyCode){
                    case 37:
                        this.moveLeft();
                        break;
                    case 38:
                        this.moveUp();
                        break;
                    case 39:
                        this.moveRight();
                        break;
                    case 40:
                        this.moveDown();
                        break;
                    case 65:
                        this.moveLeft();
                        break;
                    case 87:
                        this.moveUp();
                        break;
                    case 68:
                        this.moveRight();
                        break;
                    case 83:
                        this.moveDown();
                        break;
                }
            }),
        document.documentElement.style.setProperty('--map_size', map_size) //sends --map_size variable to css
    }
}


