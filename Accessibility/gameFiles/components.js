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
                    this.var.$state = "attack";
                    this.engine.getAnimationEngine().setEndedCallback(this.spriteholder, function () {
                        that.var.$state = "idle";
                        that.engine.do.displayText({
                            text: "Enemy deals " + damage + " damage points"
                        });
                        that.engine.do.damagePlayer(damage);
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
                    this.var.$state = "attack";
                    this.engine.getAnimationEngine().setEndedCallback(this.spriteholder, function () {
                        that.var.$state = "idle";
                        that.engine.do.displayText({
                            text: "Player deals " + damage + " damage points", callback: function () {
                                that.engine.do.enemyTurn();
                            }
                        });
                        that.engine.do.damageEnemy(damage);
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
                    this.engine.getAnimationEngine().setEndedCallback(that.spriteholder, function () {
                        that.engine.do.displaySlider();
                    });
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
                    this.var.t = 0;

                    var audioCtx = new window.AudioContext();
                    oscillator = audioCtx.createOscillator(); // Create sound source
                    oscillator.type = "sine"; // Square wave
                    oscillator.frequency.value = 440; // frequency in hertz
                    oscillator.start(0);
                    this.var.oscillator = oscillator;

                    var panNode = audioCtx.createPanner();
                    panNode.setPosition(0, 0, 0);

                    this.var.panner = panNode;
                    this.var.audioCtx = audioCtx;

                    oscillator.connect(panNode);

                    this.engine.do.displaySlider();
                }
            },
            {
                name: "#loop", code: function (event) {
                    this.var.$arrowPosition = Math.sin(this.var.t++ / 30) * 350;
                    if (this.var.textToSpeechEnabled === true) {
                        this.var.oscillator.frequency.value = 2000 - Math.abs(this.var.$arrowPosition) * 2;
                        this.var.panner.setPosition(this.var.$arrowPosition / 300, Math.cos(this.var.t / 30), 0);
                    }
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
                        var dismiss = function () {
                            that.var.$state = "empty";
                            if (event.callback) {
                                event.callback();
                            }
                        }
                    }
                    this.engine.getAnimationEngine().setEndedCallback(this.spriteholder, dismiss);
                    // setTimeout(dismiss, text.length * 100);
                }
            },
            {
                name: "displaySlider", code: function (event) {
                    this.var.$state = "slider";
                    if (this.var.textToSpeechEnabled === true) {
                        this.var.panner.connect(this.var.audioCtx.destination);
                    }
                }
            },
            {
                name: "keyboardDown", code: function (event) {
                    if (event.key == 32) {
                        if (this.var.$state === "slider") {
                            this.var.panner.disconnect();
                            this.var.$state = "empty";
                            this.engine.do.playerTurn(15 - Math.abs(Math.round((this.var.$arrowPosition / 35))));
                        }
                    } else if (event.key == 70) {
                        this.engine.getAnimationEngine().sendCommand("enableTextToSpeech");
                        this.var.textToSpeechEnabled = true;
                        if (this.var.$state == "slider") {
                            this.var.panner.connect(this.var.audioCtx.destination);
                        }
                    }
                }
            }
        ]
    }
]);