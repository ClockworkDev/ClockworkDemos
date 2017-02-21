CLOCKWORKRT.components.push([
    {
        name: "bar",
        sprite: "bar",
        collision: {
            "box": [
                { "#tag": "hitbox", "x": -2, "y": -10, "w": 5, "h": 20 }
            ]
        }
    },
    {
        name: "playerBar",
        inherits: "bar",
        events: [
            {
                name: "keyboard_down", code: function (event) {
                    if (event.key == 38) {
                        this.var.$y -= 10;
                    }
                    if (event.key == 40) {
                        this.var.$y += 10;
                    }
                    if (event.key == 66) {
                        if (HYPERGAP) {
                            HYPERGAP.API.loadMenu();
                        }
                    }
                }
            },
            {
                name: "gamepadDown", code: function (event) {
                    if (event.name == "DU") {
                        this.var.$y -= 10;
                    }
                    if (event.name == "DD") {
                        this.var.$y += 10;
                    }
                    if (event.name == "B") {
                        if (HYPERGAP) {
                            HYPERGAP.API.loadMenu();
                        }
                    }
                }
            },
            {
                name: "updateScore", code: function (event) {
                    if (event.won == "AI") {
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
        name: "enemyBar",
        inherits: "bar",
        events: [
            {
                name: "#setup", code: function (event) {
                    this.var.$y = 0;
                }
            },
            {
                name: "#loop", code: function (event) {
                    var ballX = this.engine.find("ball").var.$x;
                    var barX = this.var.$x;
                    var ballY = this.engine.find("ball").var.$y;
                    var barY = this.var.$y;

                    if (Math.abs(ballX - barX) < 50) {
                        if (Math.abs(ballY - barY) > 4) {
                            if (barY > ballY) {
                                this.var.vy--;
                            } else if (barY < ballY) {
                                this.var.vy++;
                            }
                        }
                    } else {
                        if (barY > 185) {
                            this.var.vy--;
                        } else if (barY < 15) {
                            this.var.vy++;
                        }
                    }
                    if (Math.abs(this.var.vy) > 2) {
                        this.var.vy *= 2 / 3;
                    }
                    // this.var.$y += this.var.vy;
                }
            },
            {
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
                    this.var.vx = 1;
                    this.var.vy = 1;
                }
            },
            {
                name: "#loop", code: function (event) {
                    if (this.var.$y < 0 || this.var.$y > 200) {
                        this.var.vy *= -1;
                    }
                    this.var.$x += this.var.vx;
                    this.var.$y += this.var.vy;

                    if (this.var.$x < 5) {
                        this.var.$x = 160;
                        this.var.$y = 50;
                        this.engine.do.updateScore({ won: "AI" });
                    }
                    if (this.var.$x > 315) {
                        this.var.$x = 160;
                        this.var.$y = 50;
                        this.engine.do.updateScore({ won: "player" });
                    }
                }
            },
            {
                name: "#collide", code: function (event) {
                    this.var.vx *= -1;
                    this.var.$x += this.var.vx;
                }
            }
        ],
        collision: {
            "point": [
                { "x": 0, "y": 0 }
            ]
        }
    },
    {
        name: "score",
        sprite: "score",
        events: [
            {
                name: "#setup", code: function (event) {
                    this.var.$player = 0;
                    this.var.$AI = 0;
                }
            },
            {
                name: "updateScore", code: function (event) {
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