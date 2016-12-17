var myGamePiece;
var myObstacles = [];
var myScore;
var screenWidth = screen.width - (screen.width*0.2);
var screenHeight = screen.height - (screen.height*0.2);
var mySound;
var myMusic;
var paused = false;
var difficulty = 15;

function start(level) {
    handleLevel(level);
    hideStartScreen();
    startGame();
}

function handleLevel(level)
{
    if(level == 0)
    {
        difficulty = 20;
        return;
    }
    if(level == 1)
    {
        difficulty = 15;
        return;
    }
    if(level == 2)
    {
        difficulty = 10;
        return;
    }
}

function startGame() {
    
    createGameComponents();
    createGameSounds();
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        accelerate(0.05);
        this.canvas.width = screenWidth;
        this.canvas.height = screenHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        updateGameArea();
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;

    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    this.newPos = function() {
        this.hitBottom();
        this.hitTop()
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
    }

    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }

    this.hitTop = function(){
        if((this.y - this.height) <= 0)
        {
            this.y = this.height;
            this.gravitySpeed = 0;
        }
    }

    //Verify Collision
    this.crashWith = function(otherobj) {
        var myleft      = this.x;
        var myright     = this.x + (this.width);
        var mytop       = this.y;
        var mybottom    = this.y + (this.height);
        var otherleft   = otherobj.x;
        var otherright  = otherobj.x + (otherobj.width);
        var othertop    = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }

        return crash;
    }
}

function updateGameArea() {

    if(this.paused) return;

    var x, height, gap, minHeight, maxHeight, minGap, maxGap;

    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            onLose();
        } 
    }
    
    myGameArea.clear();
    myGameArea.frameNo += 1;

    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 200;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
    }

    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }

    myScore.text="Pontos: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    if (!myGameArea.interval)
        myGameArea.interval = setInterval(updateGameArea, difficulty); //Game speed

      myGamePiece.gravity = n;
}

function onLose(){
    mySound.play();
    myMusic.stop();
    myGameArea.stop();
    showRestartButton();
    return;
}

function pause(){
    paused = !paused;
    if(paused)
    {
        myMusic.stop();
    }
    else
    {
        myMusic.play();
    }
}

function showRestartButton(){
    document.getElementById('restartBtn').style.display = "inline-block";
}

function restart(){
    document.location.reload();
}

function hideStartScreen(){
    var elements = document.getElementsByClassName("hideStartScreen");

    for(var i = 0, length = elements.length; i < length; i++)
        elements[i].style.display = 'none';
}    

function createGameComponents(){
    // create player component
    myGamePiece = new component(30, 30, "red", 10, 120);
    myGamePiece.gravity = 0.5;
    // create score component
    myScore = new component("30px", "Consolas", "white", 280, 40, "text");
}

function createGameSounds(){
    // create sound objects
    mySound = new sound("sounds/elephant.mp3"   );
    myMusic = new sound("sounds/music.mp3", true);
    myMusic.play();
}