CLOCKWORKRT.components.push([
    {
        name: "paddle",
        sprite: "paddle", //Use the paddle spritesheet contained in spritesheets.xml
        collision: {
            "box": [
                //Every padle is 5 pixels wide, 20 tall, and has its center in the coordinates of the object
                { "#tag": "hitbox", "x": -2, "y": -10, "w": 5, "h": 20 }
            ]
        }
    },
    {
        name: "playerPaddle",
        inherits: "paddle", //The player paddle inherits the sprite and collision box from the paddle component
        events: [
            {
                //Listen for keyboard input
                name: "keyboardDown", code: function (event) {
                    if (event.key == 38) { //When the UP key is pressed
                        this.var.$y -= 10; //Move 10 pixels upwards
                    }
                    if (event.key == 40) { //When the DOWN key is pressed
                        this.var.$y += 10; //Move 10 pixels downwards
                    }
                    if (event.key == 66) { ///When the B key is pressed
                        CLOCKWORKRT.API.loadMenu(); //Exit the game, going back to the Clockwork Runtime menu
                    }
                }
            },
            {
                //Exactly the same as with the keyboard, for the gamepad
                name: "gamepadDown", code: function (event) {
                    if (event.name == "DU") {
                        this.var.$y -= 10;
                    }
                    if (event.name == "DD") {
                        this.var.$y += 10;
                    }
                    if (event.name == "B") {
                        CLOCKWORKRT.API.loadMenu();
                    }
                }
            },
            {
                //Listen for an updatedScore event
                name: "updateScore", code: function (event) {
                    //If the AI won that point
                    if (event.won == "AI") {
                        //Set this paddle to the "lost" (flashing) rendering state
                        this.var.$state = "lost";
                        //Wait 2 seconds and set the state back to idle
                        var that = this;
                        setTimeout(function () {
                            that.var.$state = "idle";
                        }, 2000);
                    }
                }
            }
        ]
    },
    {
        name: "enemyPaddle",
        inherits: "paddle",
        events: [
            {
                //This runs when the level is loaded
                name: "#setup", code: function (event) {
                    this.var.vy = 0; //The speed in the u axis is 0 at first
                }
            },
            {
                //This runs every frame
                name: "#loop", code: function (event) {
                    //Get the position of both this paddle and the ball
                    var ballX = this.engine.find("ball").var.$x;
                    var paddleX = this.var.$x;
                    var ballY = this.engine.find("ball").var.$y;
                    var paddleY = this.var.$y;

                    if (Math.abs(ballX - paddleX) < 50) { //If this paddle and the ball are close enough in the X axis..
                        if (Math.abs(ballY - paddleY) > 4) { //..and in the X axis
                            if (paddleY > ballY) { //If the paddle is lower than the ball
                                this.var.vy--; //Push the paddle upwards
                            } else if (paddleY < ballY) { //If the paddle is higher than the ball
                                this.var.vy++; //Push the paddle downwards
                            }
                        }
                    } else { //Else, when the ball is away
                        if (paddleY > 185) { //If the paddle is too low
                            this.var.vy--; //Push it upwards
                        } else if (paddleY < 15) { //If it is too high
                            this.var.vy++; //Push it downwards
                        }
                    }
                    if (Math.abs(this.var.vy) > 2) { //If the speed of the paddle is too high
                        this.var.vy *= 2 / 3; //Slow it down
                    }
                    this.var.$y += this.var.vy; //Apply the speed to the current position
                }
            },
            {
                //This is the same as the event in playerPaddle
                name: "updateScore", code: function (event) {
                    if (event.won == "player") {
                        this.var.$state = "lost";
                        var that = this;
                        setTimeout(function () {
                            that.var.$state = "idle";
                        }, 2000);
                    }
                }
            }
        ]
    },
    {
        name: "ball",
        sprite: "ball",
        events: [
            {
                name: "#setup", code: function (event) {
                    this.var.vx = 1; //The ball goes DOWN and RIGHT at first
                    this.var.vy = 1;
                }
            },
            {
                name: "#loop", code: function (event) {
                    if (this.var.$y < 0 || this.var.$y > 200) { //If the ball collides with the horizontal walls
                        this.var.vy *= -1; //Change its Y speed
                    }

                    //Apply the speed
                    this.var.$x += this.var.vx;
                    this.var.$y += this.var.vy;

                    if (this.var.$x < 5) {//If the ball passed behind the player paddle
                        this.var.$x = 160;//Reset the ball position
                        this.var.$y = 50;
                        this.engine.do.updateScore({ won: "AI" });//The AI scores a point
                    }
                    if (this.var.$x > 315) {//If the ball passed behind the Ai paddle
                        this.var.$x = 160;//Reset the ball position
                        this.var.$y = 50;
                        this.engine.do.updateScore({ won: "player" });//The player scores a point
                    }
                }
            },
            {
                //This event executes when a collision (with a paddle) is detected
                name: "#collide", code: function (event) {
                    this.var.vx *= -1; //Reflect tht ball in the X axis
                    this.var.$x += this.var.vx; //Move it further from the paddle
                }
            }
        ],
        collision: {
            "point": [
                { "x": 0, "y": 0 } //The ball has a collision point, at its relative coordinates (0,0)
            ]
        }
    },
    {
        name: "score",
        sprite: "score",
        events: [
            {
                name: "#setup", code: function (event) {
                    //Set the scores to 0
                    //Since this variables begin with $, they will be forwarded to the renderer
                    //and displayed by the code in the spritesheet
                    this.var.$player = 0;
                    this.var.$AI = 0;
                }
            },
            {
                name: "updateScore", code: function (event) {
                    //When someone scores, increase its score
                    if (event.won == "player") {
                        this.var.$player++;
                    }
                    if (event.won == "AI") {
                        this.var.$AI++;
                    }
                }
            }
        ]
    }

]);