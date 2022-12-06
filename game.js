const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const bntUp = document.querySelector('#up');
const bntLeft = document.querySelector('#left');
const bntRight = document.querySelector('#right');
const bntDown = document.querySelector('#down')
const spanLives =  document.querySelector('#lives');
let canvasSize;
let elementSize
let level = 0;
let lives = 3;

const playerPosition = {
    x: undefined,
    y: undefined
};
const giftPosition = {
    x:undefined,
    y:undefined
}
let enemiesPositions = [];

window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);

function startGame() {
    //game.fillRect(0,0,100,100);
    //game.clearRect(0,0,50,50);  
    
    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';
    game.clearRect(0,0,canvasSize,canvasSize);
    enemiesPositions=[];
    const map = maps[level];
    if (!map) {
        gameWin();
        return;
    }
    showLives();
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    mapRowCols.forEach((row,rowI) => {
        row.forEach((col,colI)=>{
            const emoji = emojis[col];
            const posx= elementSize * (colI + 1);
            const posy = elementSize * (rowI + 1)
            if(col=='O' ){
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition['x']=posx;
                    playerPosition['y']=posy;
                }
            }else if(col=='I'){
                giftPosition.x=posx;
                giftPosition.y=posy;
            }else if (col=='X') {
                enemiesPositions.push({
                    x:posx,
                    y:posy
                })
            }
            game.fillText(emoji,posx,posy);

        });
    });
    
    movePlayer();
    /*for (let row = 1; row <= 10; row++) {
        for (let col = 1; col<=10; col++) {
            game.fillText(emojis[mapRowCols[row-1][col-1]],elementSize * col,elementSize*row);
            
        }
    }*/
    
}
function levelWin() {
    level++;
    startGame();
}
function gameWin() {
    console.log("Fin")
}
function levelFail() {
    lives--;
    
    if (lives <= 0) {
        level=0;
        lives=3;
    }
        
    
    playerPosition.x=undefined;
    playerPosition.y=undefined; 
    startGame();
}
function showLives() {
    const heartsArray=Array(lives).fill(emojis['HEART']);
    spanLives.innerHTML='';
    heartsArray.forEach(heart=>spanLives.innerHTML += heart)
    

}
function movePlayer() {
    const giftColisionX= playerPosition.x.toFixed(3)==giftPosition.x.toFixed(3);
    const giftColisionY = playerPosition.y.toFixed(3)==giftPosition.y.toFixed(3);
    const giftColision = giftColisionX && giftColisionY;

    if (giftColision) {
        console.log("Win")
        levelWin();
    }
    const enemyCollision = enemiesPositions.find(enemy=>{
        const enemiColisionX = enemy.x.toFixed(3)== playerPosition.x.toFixed(3);
        const enemiColisionY = enemy.y.toFixed(3)== playerPosition.y.toFixed(3);
        return enemiColisionX && enemiColisionY;
    });
    if (enemyCollision) {
        console.log("Morido");
        levelFail();

    }

    game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);
    
}
function setCanvasSize() {
    
    if (window.innerHeight>window.innerWidth) {
        canvasSize=window.innerWidth * 0.8;
    } else {
        canvasSize=window.innerHeight * 0.8;
    }
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize =  canvasSize / 10;
    startGame();
}


window.addEventListener('keydown',moveByKeys);

bntUp.addEventListener('click',moveUp);
bntLeft.addEventListener('click',moveLeft);
bntRight.addEventListener('click',moveRight);
bntDown.addEventListener('click',moveDown);

function moveByKeys(event) {
    if (event.key=='ArrowUp') {
        moveUp();
    } else if (event.key=='ArrowLeft') {
        moveLeft();
    } else if (event.key=='ArrowRight') {
        moveRight();
    } else if (event.key=='ArrowDown') {
        moveDown();
    } 

}

function moveUp() {
    if (playerPosition.y - elementSize < elementSize) {
        console.log('out');
    }else{
        playerPosition.y-=elementSize;
        startGame();
    }
    
}
function moveLeft() {
    if (playerPosition.x-elementSize < elementSize) {
        console.log('out');
    }else{
        playerPosition.x-=elementSize;
        startGame();
    }
    
}
function moveRight() {
    if ((playerPosition.x+elementSize) > canvasSize) {
        console.log('out');
    } else {
        playerPosition.x+=elementSize;
        startGame();
    }
    
}
function moveDown() {
    if (playerPosition.y + elementSize > canvasSize) {
        console.log('out');
    } else {
        playerPosition.y+=elementSize;
        startGame();
    }
    
}

