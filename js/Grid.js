import Tile from './Tile.js'
import player from './player.js'
import coin from './Coin.js'
import { levels } from './levels.js'
import { collidesWithSymbol } from './utils.js'
import RaisedSaint from './RaisedSaint.js'

export default {
    components: {
        Tile,
        player,
        coin,
        RaisedSaint
    },
    template: `
    <div class="wrapper">
        <div class="grid-layout">
            <tile 
                v-for="(tile, i) of flatMap"
                v-bind:properties="tile"
                v-bind:key="'tile' + i + tile.x + tile.y"
                ref="myTiles"
                >
            </tile>
            <coin 
                v-for="(coin, i) of coins"
                v-bind:position="coin"
                v-bind:key="'coin' + i + coin.x + coin.y"
                ref="myCoins"
            ></coin>
            <RaisedSaint 
                v-for="(monster, i) of monsters"
                v-bind:position="monster"
                v-bind:key="'monster' + i + monster.x + monster.y"
                ref="myMonsters"
            ></RaisedSaint>
            <!--<RaisedSaint v-bind:position="monsterPosition" ref="monster"></RaisedSaint>-->
            <player v-bind:position="playerPosition" ref="player"></player>
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
            monsterPosition:{
                x: 12,
                y: 8
            },
            coins: [],
            monsters: [],
            isEntity: false,
            entityType:{
                coin: false,
                monster: false
            }
        }
    },
    computed:{
        flatMap(){
            return this.tiles.flat();
        }
    },

    methods: {
        /*
        Movement Functions /w collision
        let newPos is the new Position the player wishes to move to
        an if condition get fired
        The if condition considers the new position of the player in the grid and a symbol
        The symbol repesents what the condition will check for, 
        If the new Position is the same as the symbol, return true, else ignore the condition
        Here it first check for if the new Position is a 'W' for wall and stop if true

        If neither of the conditions get triggered, set playerPosition to newPos, etc move the character
        Write 'return' at the end of an if case if you don't want the player to move over there
        */
        moveUp(){
            let newPos = {x: this.playerPosition.x, y: this.playerPosition.y - 1}
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'W')){
                return; //If player meets a wall
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'c')){
                this.pickedUpItem(newPos.x, newPos.y);
                 //If player meets a coin
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'S')){
                this.playerDies();
                return;
                //If the player meets an enemy
            }
            this.playerPosition.y = newPos.y; //If collidesWithSymbol equals false
        },

        moveDown(){
            let newPos = {x: this.playerPosition.x, y: this.playerPosition.y + 1}
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'W')){
                return; //If player meets a wall
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'c')){
                this.pickedUpItem(newPos.x, newPos.y);
                 //If player meets a coin
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'S')){
                this.playerDies();
                return;
                //If the player meets an enemy
            }
            this.playerPosition.y = newPos.y; //If collidesWithSymbol equals false     
        },

        moveLeft(){
            let newPos = {x: this.playerPosition.x - 1, y: this.playerPosition.y}
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'W')){
                return; //If player meets a wall
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'c')){
                this.pickedUpItem(newPos.x, newPos.y);
                 //If player meets a coin
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'S')){
                this.playerDies();
                return;
                //If the player meets an enemy
            }
            this.playerPosition.x = newPos.x; //If collidesWithSymbol equals false
        },
        moveRight(){
            let newPos = {x: this.playerPosition.x + 1, y: this.playerPosition.y}
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'W')){
                return; //If player meets a wall
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'c')){
                this.pickedUpItem(newPos.x, newPos.y);
                 //If player meets a coin
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'S')){
                this.playerDies();
                return;
                //If the player meets an enemy
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
                    let objectId = 'Floor';
                    tileId = 16;
                    switch(this.grid[row][col]){
                        case "W":
                            tileId = 47;
                            objectId = 'Wall'
                            break;
                        case " ":
                            tileId = 16;
                            objectId = 'Floor'
                            break;
                        case "S":
                            //this.grid[row][col] = ' ';
                            this.isEntity = true;
                            this.entityType.monster = true;
                            break;
                        case "X":
                            tileId = 16;
                            this.playerPosition.x = col;
                            this.playerPosition.y = row;
                            this.grid[row][col] = ' ';
                            break;
                        case "c":
                            //this.grid[row][col] = ' '; //TODO Ändra så att det inte funkar såhär
                            this.isEntity = true; //Om man har ett system som detta, kan programmet ej läsa av coins
                            this.entityType.coin = true;
                            break;
                    }
                    let properties = {
                        x: col,
                        y: row,
                        tileId: tileId,
                        object: objectId
                    };
                    this.tiles[row].push(properties); //Pushes properties down to child element "Tile"
                    if (this.isEntity){
                        //Check for each type of entity
                        if (this.entityType.coin){
                            console.log("Spawning coin")
                            let position = {x: col, y: row};
                            this.coins.push(position);
                        }
                        else if(this.entityType.monster){
                            console.log("Spawning monster")
                            let position = {x: col, y: row};
                            this.monsters.push(position);
                        }

                        this.entityType.coin = false;
                        this.entityType.monster = false;
                        this.isEntity = false;
                    }
                }
            }
        },

        pickedUpItem(x, y){
            console.log("picked up coin!")
            this.$refs.player.addItem();
            console.log(this.$refs.player.backpack.coin);
            for (let i = 0; i < this.$refs.myCoins.length; i++){
                let coin = this.$refs.myCoins[i];
                if (coin.pos.x == x && coin.pos.y == y){
                    this.coins.splice(i, 1);
                }
            }
            let pos = {x: 1, y: 3};
            this.grid[y][x] = ' ';
            this.$refs.myTiles[y*this.grid[0].length+x].changeTexture(pos);
        },


        playerDies(){
            console.log("stepped on a monster")
            if (this.$refs.player.backpack.coin < 5){
                alert('You died!')
                console.log("You died!")
            }
            else {
                console.log("You have more than 5 coins, you win!")
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
                    case 37: //Left Arrowkey
                        this.moveLeft();
                        break;
                    case 38: //Up Arrowkey
                        this.moveUp();
                        break;
                    case 39: //Right Arrowkey
                        this.moveRight();
                        break;
                    case 40: //Down Arrowkey
                        this.moveDown();
                        break;
                    case 65: //A
                        this.moveLeft();
                        break;
                    case 87: //W
                        this.moveUp();
                        break;
                    case 68: //D
                        this.moveRight();
                        break;
                    case 83: //S
                        this.moveDown();
                        break;
                }
            }),
        document.documentElement.style.setProperty('--map_size', this.grid[0].length) //sends --size of map variable to css
    }
}
