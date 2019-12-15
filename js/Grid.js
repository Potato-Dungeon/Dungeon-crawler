import Tile from './Tile.js'
import player from './player.js'
import coin from './Coin.js'
import { levels } from './levels.js'
import { collidesWithSymbol } from './utils.js'

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
            <coin 
                v-for="(coin, i) of coins"
                v-bind:position="coin"
                v-bind:key="'coin' + i + coin.x + coin.y"
            ></coin>
            <player v-bind:position="playerPosition"></player>
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
            let newPos = {x: this.playerPosition.x, y: this.playerPosition.y - 1}
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'W')){
                return; //If player meets a wall
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'c')){
                console.log("picked up coin!")
                return; //If player meets a coin
            }
            this.playerPosition.y = newPos.y; //If collidesWithSymbol equals false
        },

        moveDown(){
            let newPos = {x: this.playerPosition.x, y: this.playerPosition.y + 1}
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'W')){
                return; //If player meets a wall
            }
            this.playerPosition.y = newPos.y; //If collidesWithSymbol equals false     
        },

        moveLeft(){
            let newPos = {x: this.playerPosition.x - 1, y: this.playerPosition.y}
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'W')){
                return; //If player meets a wall
            }
            this.playerPosition.x = newPos.x; //If collidesWithSymbol equals false
        },
        moveRight(){
            let newPos = {x: this.playerPosition.x + 1, y: this.playerPosition.y}
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'W')){
                return; //If player meets a wall
            }
            this.playerPosition.x = newPos.x; //If collidesWithSymbol equals false
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
                            this.grid[row][col] = ' '; //TODO Ändra så att det inte funkar såhär
                            this.isEntity = true; //Om man har ett system som detta, kan programmet ej läsa av coins
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
        document.documentElement.style.setProperty('--map_size', this.grid[0].length) //sends --size of map variable to css
    }
}


