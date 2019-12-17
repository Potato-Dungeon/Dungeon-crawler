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
            coins: [],
            monsters: [],
            isEntity: false,
            entityType:{
                coin: false,
                monster: false
            },
            audio:{ //All audiofiles goes here in this hierarchy
                player:{
                    walk: 'assets/sounds/skeletonwalk.wav',
                    coinPickup: 'assets/sounds/goldpickup.wav',
                    questPickup: 'assets/sounds/applebite.wav',
                    wall:'',
                    death: 'assets/sounds/playerdeath.wav'
                },
                enemy:{
                    death: 'assets/sounds/enemydeath.wav',
                    deathBoss: 'assets/sounds/bossdeath.wav',
                    bossWin: 'assets/sounds/bosswin.wav'
                }
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
                this.playSound('coinPickup');
                 //If player meets a coin
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'S')){
                this.raisedSaintCombat(newPos.x, newPos.y);
                return;
                //If the player meets an enemy
            }
            this.playSound('walk');
            this.playerPosition.y = newPos.y; //If collidesWithSymbol equals false
        },

        moveDown(){
            let newPos = {x: this.playerPosition.x, y: this.playerPosition.y + 1}
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'W')){
                return; //If player meets a wall
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'c')){
                this.pickedUpItem(newPos.x, newPos.y);
                this.playSound('coinPickup');
                 //If player meets a coin
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'S')){
                this.raisedSaintCombat(newPos.x, newPos.y);
                return;
                //If the player meets an enemy
            }

            this.playSound('walk');
            this.playerPosition.y = newPos.y; //If collidesWithSymbol equals false     
        },

        moveLeft(){
            let newPos = {x: this.playerPosition.x - 1, y: this.playerPosition.y}
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'W')){
                return; //If player meets a wall
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'c')){
                this.pickedUpItem(newPos.x, newPos.y);
                this.playSound('coinPickup');
                 //If player meets a coin
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'S')){
                this.raisedSaintCombat(newPos.x, newPos.y);
                return;
                //If the player meets an enemy
            }

            this.playSound('walk');
            this.playerPosition.x = newPos.x; //If collidesWithSymbol equals false
        },
        moveRight(){
            let newPos = {x: this.playerPosition.x + 1, y: this.playerPosition.y}
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'W')){
                return; //If player meets a wall
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'c')){
                this.pickedUpItem(newPos.x, newPos.y);
                this.playSound('coinPickup');
                 //If player meets a coin
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'S')){
                this.raisedSaintCombat(newPos.x, newPos.y);
                return;
                //If the player meets an enemy
            }

            this.playSound('walk');
            this.playerPosition.x = newPos.x; //If collidesWithSymbol equals false
        },

        //Handling all sounds
        playSound(soundName){
            let file;
            switch(soundName){
                case "walk":
                    file = this.audio.player.walk;
                    break;
                case "coinPickup":
                    file = this.audio.player.coinPickup;
                    break;
                case "questPickup":
                    file = this.audio.player.questPickup;
                    break;
                case "playerDeath":
                    file = this.audio.player.death;
                    break;
                case "enemyDeath":
                    file = this.audio.enemy.death;
                    break;
                case "bossDeath":
                    file = this.audio.enemy.deathBoss;
                    break;
                case "bossWin":
                    file = this.audio.enemy.bossWin;
                    break;
                default: 
                console.log(`ERROR: Expected valid variable, got '${file}' or none`)
            }
            let audio = new Audio(file);
            audio.play();
        },

        nextLevel(){
            this.level++;

            if (this.level > levels.length)this.level = 0;
            this.grid = levels[this.level];
            this.updateTiles();
        },

        //Draws and check grid for what symbol and if entity or not.
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

        //Pickup item function
        pickedUpItem(x, y){
            this.$refs.player.addItem();
            console.log("Current coins in backpack: " + this.$refs.player.backpack.coin);
            for (let i = 0; i < this.$refs.myCoins.length; i++){
                let coin = this.$refs.myCoins[i];
                if (coin.pos.x == x && coin.pos.y == y){
                    this.coins.splice(i, 1);
                }
            }
        },

        //raisedSaintCombat
        raisedSaintCombat(x, y){
            if (this.$refs.player.backpack.coin === 0){ //If player has 0 coins and step on an enemy
                alert('You died, you need atleast one coin to fight this enemy!');
                console.log("You died from being poor!");
                location.reload();
            }
            else if(this.$refs.player.backpack.coin >= 1){
                console.log("Before combat, you have " + this.$refs.player.backpack.coin + " coins.");
                let pos = {x: 1, y: 3};
                for (let i = 0; i < this.$refs.myMonsters.length; i++){
                    let monst = this.$refs.myMonsters[i];
                    if (monst.pos.x == x && monst.pos.y == y){
                        this.$refs.player.backpack.coin -= this.$refs.myMonsters[i].damage;
                        //To get the entity monster (in the array myMonsters) damage
                        console.log("After combat, you have " + this.$refs.player.backpack.coin + " coins.");
                        this.monsters.splice(i, 1);
                    }
                }
                this.grid[y][x] = ' ';
                this.$refs.myTiles[y*this.grid[0].length+x].changeTexture(pos);
            }
        }
    },
    created() {
        //Runs when program start
        this.updateTiles();
    },
    mounted() {
        // EventListener for reaction on keyup 
        window.addEventListener('keyup', (e) => {
                switch(e.keyCode){
                    case 37: //Left Arrowkey
                    case 65: //A
                        this.moveLeft();
                        break;
                    case 38: //Up Arrowkey
                    case 87: //W
                        this.moveUp();
                        break;
                    case 39: //Right Arrowkey
                    case 68: //D
                        this.moveRight();
                        break;
                    case 40: //Down Arrowkey
                    case 83: //S
                        this.moveDown();
                        break;
                }
            }),
    
        document.documentElement.style.setProperty('--map_size', this.grid[0].length) //sends --size of map variable to css
    }
}
