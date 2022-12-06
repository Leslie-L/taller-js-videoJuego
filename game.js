const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const bntUp = document.querySelector('#up');
const bntLeft = document.querySelector('#left');
const bntRight = document.querySelector('#right');
const bntDown = document.querySelector('#down')

let canvasSize;
let elementSize

const playerPosition = {
    x: undefined,
    y: undefined
};


window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);

function startGame() {
    //game.fillRect(0,0,100,100);
    //game.clearRect(0,0,50,50);  
    
    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';
    game.clearRect(0,0,canvasSize,canvasSize);
    const map = maps[0];
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
function movePlayer() {
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

