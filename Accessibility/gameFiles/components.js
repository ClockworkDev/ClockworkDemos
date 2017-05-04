CLOCKWORKRT.components.register([
    {
        name: "background",
        sprite: "background",
        events: [
            {
                name: "#setup", code: function () {
                    this.var.$state = "idle";
                }
            }
        ]
    },
    {
        name: "enemy",
        sprite: "enemy", events: [
            {
                name: "#setup", code: function () {
                    this.var.$health = 100;
                    this.var.$state = "idle";
                }
            },
            {
                name: "enemyTurn", code: function () {
                    var that = this;
                    var damage = Math.round(5 + Math.random() * 10);
                    this.engine.do.displayText({
                        text: "Enemy deals " + damage + " damage points", callback: function () {
                            that.var.$state = "attack";
                            setTimeout(function () {
                                that.engine.do.damagePlayer(damage);
                            }, 500);
                            setTimeout(function () {
                                that.var.$state = "idle";
                                that.engine.do.displaySlider();
                            }, 1000);
                        }
                    });
                }
            },
            {
                name: "damageEnemy", code: function (event) {
                    this.var.$health -= event;
                    this.var.$state = "damaged";
                    var that = this;
                    setTimeout(function () {
                        that.var.$state = "idle";
                    }, 100);
                }
            }
        ]
    },
    {
        name: "player",
        sprite: "player",
        events: [
            {
                name: "#setup", code: function () {
                    this.var.$health = 100;
                    this.var.$state = "idle";
                    this.engine.do.displaySlider();
                }
            },
            {
                name: "playerTurn", code: function (damage) {
                    var that = this;
                    this.engine.do.displayText({
                        text: "Player deals " + damage + " damage points", callback: function () {
                            that.var.$state = "attack";
                            setTimeout(function () {
                                that.engine.do.damageEnemy(damage);
                            }, 500);
                            setTimeout(function () {
                                that.var.$state = "idle";
                                that.engine.do.enemyTurn();
                            }, 1000);
                        }
                    });
                }
            },
            {
                name: "damagePlayer", code: function (event) {
                    this.var.$health -= event;
                    this.var.$state = "damaged";
                    var that = this;
                    setTimeout(function () {
                        that.var.$state = "idle";
                    }, 100);
                }
            }
        ]
    },
    {
        name: "dialog",
        sprite: "dialog",
        events: [
            {
                name: "#setup", code: function () {
                    this.var.$health = 100;
                    this.engine.do.displaySlider();
                    this.var.t = 0;
                }
            },
            {
                name: "#loop", code: function (event) {
                    this.var.$arrowPosition = Math.sin(this.var.t++ / 30) * 350;
                }
            },
            {
                name: "displayText", code: function (event) {
                    var that = this;
                    var text = event.text;
                    this.var.$text = text;
                    if (text === "") {
                        this.var.$state = "empty";
                    } else {
                        this.var.$state = "text";
                        setTimeout(function () {
                            that.var.$state = "empty";
                            event.callback()
                        }, text.length * 100);
                    }
                }
            },
            {
                name: "displaySlider", code: function (event) {
                    this.var.$state = "slider";
                }
            },
            {
                name: "keyboardDown", code: function (event) {
                    if (this.var.$state === "slider") {
                        this.var.$state = "empty";
                        this.engine.do.playerTurn(15 - Math.abs(Math.round((this.var.$arrowPosition / 35))));
                    }
                }
            }
        ]
    }
]);