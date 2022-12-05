const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
let canvasSize;
let elementSize
window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);

function startGame() {
    //game.fillRect(0,0,100,100);
    //game.clearRect(0,0,50,50);  
    
    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    mapRowCols.forEach((row,rowI) => {
        row.forEach((col,colI)=>{
            const emoji = emojis[col];
            const posx= elementSize * (colI + 1);
            const posy = elementSize * (rowI + 1)
            game.fillText(emoji,posx,posy);
        });
    });

    /*for (let row = 1; row <= 10; row++) {
        for (let col = 1; col<=10; col++) {
            game.fillText(emojis[mapRowCols[row-1][col-1]],elementSize * col,elementSize*row);
            
        }
    }*/
    
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