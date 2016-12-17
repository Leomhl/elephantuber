function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;

    this.update = function(gameArea) {
        ctx = gameArea.context;
        if (type == "image") {
                ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } 
        else if(this.type == "text") {
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
        var crash       = true;
        
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }

        return crash;
    }
}