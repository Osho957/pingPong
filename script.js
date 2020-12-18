//alert("Js Connected");
let ball = document.querySelector(".ball");
let board = document.querySelector(".board");
let leftPaddle = document.querySelector(".left");
let rightPaddle = document.querySelector(".right");
let boardBounds = board.getBoundingClientRect();
let x = true;
let y = true;

let leftPlayerLive = 3;
let rightPlayerLive = 3;

//user ka input
document.addEventListener("keydown", function (e) {
    console.log("koi to hai");
    console.log(e);
    if (e.key == "w") {
        movePaddle(leftPaddle, -window.innerHeight * 0.1);
    } else if (e.key == "s") {
        movePaddle(leftPaddle, window.innerHeight * 0.1);
    } else if (e.key == "ArrowUp") {
        movePaddle(rightPaddle, -window.innerHeight * 0.1);
    } else if (e.key == "ArrowDown") {
        movePaddle(rightPaddle, window.innerHeight * 0.1);
    }
})


function setColor(index){
    let allIcons = document.querySelectorAll(".fas.fa-circle");
    allIcons[index].style.color = "#034afc";
 }

function movePaddle(cPaddle, change) {

    let cPaddleBounds = cPaddle.getBoundingClientRect();
    if (cPaddleBounds.top + change >= boardBounds.top && cPaddleBounds.bottom + change <= boardBounds.bottom) {
        cPaddle.style.top = cPaddleBounds.top + change + "px";
    }

}

function moveBall() {
    let ballcordinate = ball.getBoundingClientRect();
    let ballTop = ballcordinate.top;
    let ballLeft = ballcordinate.left;
    let ballBottom = ballcordinate.bottom;
    let ballRight = ballcordinate.right;


    let hasTouchedLeft = ballLeft < boardBounds.left;
    let hasTouchedRight = ballRight > boardBounds.right;

    if (hasTouchedLeft || hasTouchedRight) {
        if (hasTouchedLeft) {
            leftPlayerLive--;
           setColor(leftPlayerLive);
            if (leftPlayerLive == 0) {
                alert("Game Over Player B WON");
                document.location.reload();
            }else {
                return resetGame();
            }

        }else{
            rightPlayerLive--;
            setColor(3+rightPlayerLive);
            if(rightPlayerLive==0){
                alert("Game Over Player A Won");
              document.location.reload();

            }else {
                return resetGame();
            }
        }
     } 

        function resetGame() {
            ball.style.top = window.innerHeight * 0.40 + "px";
            ball.style.left = window.innerWidth * 0.40 + "px";
            requestAnimationFrame(moveBall);
        }
    

        //handle kro vertical bound ko uske baad horizontal ko
        if (ballTop <= boardBounds.top || ballBottom >= boardBounds.bottom) {
            y = !y;
        }

        // if (ballLeft <= boardBounds.left || ballRight >= boardBounds.right) {
        //     x = !x;
        // }
        // collision wala code
        let leftPaddleBounds = leftPaddle.getBoundingClientRect();
        let rightPaddleBounds = rightPaddle.getBoundingClientRect();

        if (ballLeft <= leftPaddleBounds.right && ballRight >= leftPaddleBounds.left && ballTop + 30 >= leftPaddleBounds.top && ballBottom - 30 <= leftPaddleBounds.bottom) {
            x = !x;
        }

        if (ballLeft <= rightPaddleBounds.right && ballRight >= rightPaddleBounds.left && ballTop + 30 >= rightPaddleBounds.top && ballBottom - 30 <= rightPaddleBounds.bottom) {
            x = !x;
        }
        //collision code khtm

        ball.style.top = y == true ? ballTop + 5 + "px" : ballTop - 5 + "px";
        ball.style.left = x == true ? ballLeft + 5 + "px" : ballLeft - 5 + "px";
        requestAnimationFrame(moveBall);
    }

    requestAnimationFrame(moveBall);
