const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let speed = 7;
let tileCount = 20;
let tileSize = 18;
let headX = 10;
let headY = 10;
let xVelocity = 0;
let yVelocity = 0;
let appleX = 5;
let appleY = 5;
const snakeParts = [];
let tailLength = 2;
let score= 0;

class snakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function drawGame() {
    changeSnakePoisition();
    
    let result= isGameOver();
    if(result){
        return;
    }

    clearScreen();
    drawSnake();
    checkCollision();
    drawApple();
    drawScore();
    setTimeout(drawGame, 1000 / speed);
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function drawScore(){
    ctx.fillStyle='white';
    ctx.font= "10px verdena";
    ctx.fillText("Score: "+ score, canvas.clientWidth-50,10);
}

function changeSnakePoisition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawSnake() {
     ctx.fillStyle="green";
    for(let i=0;i<snakeParts.length;i++){
        let part=snakeParts[i]
         ctx.fillRect(part.x *tileCount, part.y *tileCount, tileSize,tileSize)
    }
    snakeParts.push(new snakePart(headX,headY));
    if(snakeParts.length>tailLength){
        snakeParts.shift();
    }
    ctx.fillStyle="orange";
    ctx.fillRect(headX* tileCount,headY* tileCount, tileSize,tileSize)
}

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function checkCollision() {
    if (appleX == headX && appleY == headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
    }
}

function isGameOver(){
    let gameOver=false; 
    //check whether game has started
    if(yVelocity===0 && xVelocity===0){
        return false;
    }
    if(headX<0){//if snake hits left wall
        gameOver=true;
    }
    else if(headX===tileCount){//if snake hits right wall
        gameOver=true;
    }
    else if(headY<0){//if snake hits wall at the top
        gameOver=true;
    }
    else if(headY===tileCount){//if snake hits wall at the bottom
        gameOver=true;
    }

    //stop game when snake crush to its own body

     for(let i=0; i<snakeParts.length;i++){
         let part=snakeParts[i];
         if(part.x===headX && part.y===headY){//check whether any part of snake is occupying the same space
             gameOver=true;
             break; // to break out of for loop
         }
     }

     if (gameOver){
        ctx.fillStyle='white';
        ctx.font="50px verdana"
        ctx.fillText("Game Over!", canvas.clientWidth/6.5, canvas.clientHeight/2)
     }
     return gameOver;

}

document.body.addEventListener('keydown', keyDown)

function keyDown(event) {
    /* Up */
    if (event.keyCode == 38) {
        if (yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
    /* Down */
    if (event.keyCode == 40) {
        if (yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
    /* Right */
    if (event.keyCode == 39) {
        if (xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
    /* Left */
    if (event.keyCode == 37) {
        if (xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }

}


drawGame();