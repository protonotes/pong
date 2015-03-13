// Create the 2D Canvas
var canvas = document.getElementById("gameBoard"),
    ctx    = canvas.getContext("2d");

// Default fill color
ctx.fillStyle = "#000000";

// Define the objects
var ball = {
    radius: 10,
    speed: 5,
    deltaX: 0,
    deltaY: 0,
    x: 300,
    y: 300
}

var paddle = {
    height: 25,
    width: 75,
    speedX: 10,
    deltaX: 0,
    deltaY: 0,
    x: 350,
    y: 600
}

var block = {
    width: 75,
    height: 25,
    rows: 5,
    cols: 10
}

// Create block matrix
var blocks = [
    [1,1,1,1,1,1,1,2,3,1],
    [1,1,3,1,0,1,1,1,0,1],
    [1,2,1,1,0,3,1,1,2,0],
    [2,1,2,1,2,1,0,1,3,1]
];

// Block generator
// function matrix(ary) {
//     for (var i = 0; i < block.rows; i++) {
//         for (var j = 0; j < block.cols; j++) {
//             var blockType = Math.floor(Math.random() * 3);
//             ary.push(blockType);
//         }        
//         blocks.push(ary);
//     }
// }

// Populate blocks array
// matrix([]);

// Create the objects
function drawPaddle() {
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius,0,Math.PI*2,true);
    ctx.fill();
}

function createBlocks() {
    for(var i=0; i < blocks.length; i++) {
        for(var j = 0; j < blocks[i].length; j++) {
            drawBlocks(j,i,blocks[i][j]);
        }
    }
}

// Draw the game blocks

function drawBlocks(x,y,type) {
    switch(type){
        case 1:
            var block1 = new Image();
            block1.src = 'images/brick1.jpg';
            block1.onload = function() {                
                ctx.drawImage(block1,0,0);                
            }
            break;
        case 2:
            ctx.fillStyle = '#0071C2';
            break
        case 3: 
            ctx.fillStyle = '#6FC2FC';
            break;
        default:
            ctx.clearRect(x*block.width, y*block.height, block.width, block.height);
            break;
    }
    // Draw blocks at their coordinates
    // The coordinates are created by multiplying the width of the block
    // times the index in the blocks array
    if (type){
        ctx.fillRect(x*block.width, y*block.height, block.width, block.height);
        ctx.strokeRect(x*block.width+1, y*block.height+1, block.width-2, block.height-2)
        ctx.strokeStyle = "#7B9DB5"
    }
}

// Scoreboard
var score = 0;

function displayScore() {
    ctx.fillStyle = 'black';
    ctx.font = "20px Helvetica";

    // Make space at bottom of board
    ctx.clearRect(0,canvas.height-30, canvas.width,30);
    // Write the score to the bottom left
    ctx.fillText('Score: ' +score,10,canvas.height-5);
}

function moveBall() {
    // Bounce ball off top border
    if (ball.x + ball.deltaY - ball.radius < 0 ||
        collideY() ){
        ball.deltaY = -ball.deltaY;
    }
    // End game if the ball touches bottom border
    if (ball.y + ball.deltaY + ball.radius > canvas.height){
        gameOver();
    }
    // Bounce ball off left or right
    if ((ball.x + ball.deltaX - ball.radius < 0) || 
        (ball.x + ball.deltaX + ball.radius > canvas.width) ||
        collideX() ) {
        ball.deltaX = -ball.deltaX;
    }
    // Bounce ball on top of paddle
    if (ball.y + ball.deltaX + ball.radius >= paddle.y) {
        if (ball.x + ball.deltaX >= paddle.x && ball.x + ball.deltaX <= paddle.x + paddle.width) {
            ball.deltaY = -ball.deltaY;
        }
    }
    // Ball movement
    ball.x = ball.x + ball.deltaX;
    ball.y = ball.y + ball.deltaY;
}

function movePaddle () {
    if (paddleMove == 'LEFT') {
        paddle.deltaX = -paddle.speedX;
    } else if (paddleMove == 'RIGHT') {
        paddle.deltaX = paddle.speedX;
    } else {
        paddle.deltaX = 0;
    }
    // Prevent paddle moving outside of the borders
    if (paddle.x + paddle.deltaX < 0 || paddle.x + paddle.deltaX + paddle.width > canvas.width) {
        paddle.deltaX = 0;
    }
    paddle.x = paddle.x + paddle.deltaX;
}

// Animate the board
function animate() {
    // Clear the old 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createBlocks();
    displayScore();
    moveBall();
    movePaddle();
    drawPaddle();
    drawBall();
}

function collideX(){
    var touchX = false;    
    for (var i=0; i < blocks.length; i++) {
        for (var j=0; j < blocks[i].length; j++) {
            if (blocks[i][j]) { 
                var blockx = j * block.width;
                var blocky = i * block.height;
                if (
                    // touch from left
                    ((ball.x + ball.deltaX + ball.radius >= blockx) &&
                    (ball.x + ball.radius <= blockx))
                    ||
                    // touch from right
                    ((ball.x + ball.deltaX - ball.radius <= blockx + block.width) &&
                    (ball.x - ball.radius >= blockx + block.width))
                    ){      
                    if ((ball.y + ball.deltaY -ball.radius <= blocky + block.height) &&
                        (ball.y + ball.deltaY + ball.radius >= blocky)){                                                    
                        // damage block
                        damageBlock(i,j);
 
                        touchX = true;
                    }
                }
            }
        }
    }
    return touchX;
}

function collideY(){
    var touchY = false;
    for (var i=0; i < blocks.length; i++) {
        for (var j=0; j < blocks[i].length; j++) {
            if (blocks[i][j]){ 
                var blockx = j * block.width;
                var blocky = i * block.height;
                if (
                    // touch from below
                    ((ball.y + ball.deltaY - ball.radius <= blocky + block.height) && 
                     (ball.y - ball.radius >= blocky + block.height))
                    ||
                    // touch from above
                    ((ball.y + ball.deltaY + ball.radius >= blocky) &&
                     (ball.y + ball.radius <= blocky ))){
                    if (ball.x + ball.deltaX + ball.radius >= blockx && 
                        ball.x + ball.deltaX - ball.radius <= blockx + block.width){                                      
                        // damage block
                        damageBlock(i,j);                          
                        touchY = true;
                    }                       
                }
            }
        }
    }
    return touchY;
}

function damageBlock (i,j) {
    // Block is damaged
    blocks[i][j] --;
    // Score +1 if block is damaged, +2 otherwise
    if (blocks[i][j] > 0 ){
        score++;
    } else {
        score += 2;
    }
}

 function gameStart() {
     ball.deltaY = -4;
     ball.deltaX = -2;
     paddleMove  = 'NONE';
     gameLoop    = setInterval(animate,20);
     // Listen for down keystroke
     $( document ).keydown(function(press) {
         if (press.keyCode == 39) {
             paddleMove = 'RIGHT';
         } else if (press.keyCode == 37) {
             paddleMove = 'LEFT';
         }
     });
     // Listen for up keystroke
     $( document ).keyup(function(release) {
         if (release.keyCode == 39) {
             paddleMove = 'NONE';
         } else if (release.keyCode == 37) {
             paddleMove = 'NONE';
         }
     });
 }

function gameOver() {
    clearInterval(gameLoop);
    ctx.fillText('Game Over', canvas.width/2,canvas.height/2);
}

// Draw the board
createBlocks();
displayScore();
drawPaddle();
drawBall();

$('#start').click(function() {
    gameStart();
});

$('#stop').click(function() {
    ball.deltaX = 0;
    ball.deltaY = 0;
})
