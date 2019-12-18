import Tile from './Tile.js'
import player from './player.js'
import coin from './Coin.js'
import apple from './Apple.js'
import { levels } from './levels.js'
import { collidesWithSymbol } from './utils.js'
import RaisedSaint from './RaisedSaint.js'
import PriestBoss from './PriestBoss.js'

export default {
    components: {
        Tile,
        player,
        coin,
        apple,
        RaisedSaint,
        PriestBoss
    },
    template: `
    <div class="wrapper">
        <div id="points">
        <p id="displayPoints">{{coin}} Coins {{ apple }} Apple
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
            <apple
                v-for="(apple, i) of apples"
                v-bind:position="apple"
                v-bind:key="'apple' + i + apple.x + apple.y"
                ref="myApple"
            ></apple>
            <RaisedSaint 
                v-for="(monster, i) of monsters"
                v-bind:position="monster"
                v-bind:key="'monster' + i + monster.x + monster.y"
                ref="myMonsters"
            ></RaisedSaint>
            <PriestBoss 
                v-for="(priestBoss, i) of priestBosses"
                v-bind:position="priestBoss"
                v-bind:key="'priestBoss' + i + priestBoss.x + priestBoss.y"
                ref="myBoss"
            ></PriestBoss>
            <!--<RaisedSaint v-bind:position="monsterPosition" ref="monster"></RaisedSaint>-->
            <player v-bind:position="playerPosition" ref="player"></player>
        </div>
    </div>
    </p>
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
            coin: 0,
            apple: 0,
            coins: [],
            apples: [],
            monsters: [],
            priestBosses: [],
            isEntity: false,
            entityType:{
                coin: false,
                apple: false,
                monster: false,
                priestBoss: false,
            },
            audio:{ //All audiofiles goes here in this hierarchy
                player:{
                    walk: 'assets/sounds/skeletonwalk.wav',
                    coinPickup: 'assets/sounds/goldpickup.wav',
                    questPickup: 'assets/sounds/applebite.wav',
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
                this.pickedUpCoin(newPos.x, newPos.y);
                 //If player meets a coin
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'a')){
                this.pickedUpApple(newPos.x, newPos.y);
                 //If player meets an apple
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'S')){
                this.raisedSaintCombat(newPos.x, newPos.y);
                return;
                //If the player meets an enemy
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'B')){
                this.bossCombat(newPos.x, newPos.y);
                return;
                //If the player meets the boss
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
                this.pickedUpCoin(newPos.x, newPos.y);
                 //If player meets a coin
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'a')){
                this.pickedUpApple(newPos.x, newPos.y);
                 //If player meets an apple
            }     
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'S')){
                this.raisedSaintCombat(newPos.x, newPos.y);
                return;
                //If the player meets an enemy
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'B')){
                this.bossCombat(newPos.x, newPos.y);
                return;
                //If the player meets the boss
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
                this.pickedUpCoin(newPos.x, newPos.y);
                 //If player meets a coin
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'a')){
                this.pickedUpApple(newPos.x, newPos.y);
                 //If player meets an apple
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'S')){
                this.raisedSaintCombat(newPos.x, newPos.y);
                return;
                //If the player meets an enemy
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'B')){
                this.bossCombat(newPos.x, newPos.y);
                return;
                //If the player meets the boss
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
                this.pickedUpCoin(newPos.x, newPos.y);
                 //If player meets a coin
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'a')){
                this.pickedUpApple(newPos.x, newPos.y);
                 //If player meets an apple
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'S')){
                this.raisedSaintCombat(newPos.x, newPos.y);
                return;
                //If the player meets an enemy
            }
            if (collidesWithSymbol(this.grid[newPos.y][newPos.x], 'B')){
                this.bossCombat(newPos.x, newPos.y);
                return;
                //If the player meets the boss
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
                        case "B":
                            this.isEntity = true;
                            this.entityType.priestBoss = true;
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
                        case "a":    
                        this.isEntity = true;
                        this.entityType.apple = true;
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
                            //console.log("Spawning coin")
                            let position = {x: col, y: row};
                            this.coins.push(position);
                        }
                        else if(this.entityType.apple){
                            //console.log("Spawning apple")
                            let position = {x: col, y: row};
                            this.apples.push(position);
                        }
                        else if(this.entityType.monster){
                            //console.log("Spawning monster")
                            let position = {x: col, y: row};
                            this.monsters.push(position);
                        }
                        else if(this.entityType.priestBoss){
                            //console.log("Spawning the Priest Boss")
                            let position = {x: col, y: row};
                            this.priestBosses.push(position);
                        }

                        this.entityType.coin = false;
                        this.entityType.apple = false;
                        this.entityType.monster = false;
                        this.entityType.priestBoss = false;
                        this.isEntity = false;
                    }
                }
            }
        },

        pickedUpCoin(x, y){
            this.$refs.player.addCoin();
            console.log("The player has " +this.$refs.player.backpack.coin + " coins in their backpack");
            for (let i = 0; i < this.$refs.myCoins.length; i++){
                let coin = this.$refs.myCoins[i];
                if (coin.pos.x == x && coin.pos.y == y){
                    this.coins.splice(i, 1);
                }
            }
            this.updatedCoin(this.$refs.player.backpack.coin);
            this.playSound('coinPickup');
            this.grid[y][x] = ' ';
        },

        pickedUpApple(x, y){
            console.log("You picked up the apple!")
            this.$refs.player.addApple();
            console.log(this.$refs.player.backpack.apple);
            for (let i = 0; i < this.$refs.myApple.length; i++){
                let apple = this.$refs.myApple[i];
                if (apple.pos.x == x && apple.pos.y == y){
                    this.apples.splice(i, 1);
                }
            }
            this.updatedApple(this.$refs.player.backpack.apple);
            this.playSound('questPickup')
            this.grid[y][x] = ' ';
        },

        raisedSaintCombat(x, y){
            for (let i = 0; i < this.$refs.myMonsters.length; i++){
                let monst = this.$refs.myMonsters[i];
                if (monst.pos.x == x && monst.pos.y == y){
                    this.$refs.player.backpack.coin -= this.$refs.myMonsters[i].damage;
                    //To get the entity monster (in the array myMonsters) damage
                    if (this.$refs.player.backpack.coin < 0){ //If player backpack coin is less than 0 after a combat
                        this.playSound('playerDeath')
                        alert('You died, you need atleast two coins to fight this enemy!');
                        console.log("You died from being poor!");
                        location.reload();
                    }
                    console.log("After combat, you have " + this.$refs.player.backpack.coin + " coins.");
                    this.updatedCoin(this.$refs.player.backpack.coin);
                    this.playSound('enemyDeath')
                    this.monsters.splice(i, 1);
                }
            }
            this.grid[y][x] = ' ';
        },
        bossCombat(x, y){
            console.log("Start of the bossbattle")
            if (this.$refs.player.backpack.apple === 0){
                this.playSound('bossWin')
                alert('You died, you need the Apple of Knowledge to defeat the evil priest!');
                console.log("You died because you lacked the apple");
                location.reload();
            }
            else if(this.$refs.player.backpack.apple >= 1){
                console.log("You used the apple of Knowledge to defeat the evil priest!");
                let pos = {x: 1, y: 3};
                for (let i = 0; i < this.$refs.myBoss.length; i++){
                    let boss = this.$refs.myBoss[i];
                    if (boss.pos.x == x && boss.pos.y == y){
                        this.$refs.player.backpack.apple -= this.$refs.myBoss[i].damage;
                        //To get the entity boss (in the array myBosses) damage
                        this.priestBosses.splice(i, 1);
                        this.updatedApple(this.$refs.player.backpack.apple);
                        this.playSound('bossDeath');
                        alert("You won!");
                    }
                }
                this.grid[y][x] = ' ';
                this.$refs.myTiles[y*this.grid[0].length+x].changeTexture(pos);
            }
        },
        updatedCoin(coins){
            this.coin = coins
        },
        updatedApple(apple){
            this.apple = apple
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
