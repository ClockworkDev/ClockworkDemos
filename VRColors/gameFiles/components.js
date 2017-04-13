CLOCKWORKRT.components.register([
    {
        name: "platform",
        sprite: "platform",
        events: [
            {
                name: "#setup", code: function (event) {
                    this.var.$state=this.var.color;
                    this.engine.getAnimationEngine().sendCommand("setMouseEnter",{callback:this.do.gazeIn,id:this.spriteholder});
                    this.engine.getAnimationEngine().sendCommand("setMouseLeave",{callback:this.do.gazeOut,id:this.spriteholder});
                }
            },
            {
                name: "gazeIn", code: function (event) {
                    this.var.$state="active";
                    this.engine.do.colorActivated(this.var.color);
                }
            },
            {
                name: "gazeOut", code: function (event) {
                    this.var.$state=this.var.color;
                }
            }]
    },
        {
        name: "redPlatform",
        inherits: "platform",
        vars:[
            {"name":"color","value":"red"}
        ]
    },
    {
        name: "greenPlatform",
        inherits: "platform",
        vars:[
            {"name":"color","value":"green"}
        ]
    },
        {
        name: "bluePlatform",
        inherits: "platform",
        vars:[
            {"name":"color","value":"blue"}
        ]
    },
    {
        name: "floor",
        sprite: "floor"
    },
    {
        name: "cursorCamera",
        sprite: "cursorCamera"
    },
    {
        name: "sky",
        sprite: "sky",
          events: [
            {
                name: "#setup", code: function (event) {
                    this.do.changeColor();
                }
            },
            {
                name: "changeColor", code: function (event) {
                    var colors= ["red","green","blue"];
                    do{
                        var newColor= colors[Math.floor(Math.random()*colors.length)];
                    }while(newColor==this.var.$state);
                    this.var.$state=newColor;
                }
            },
            {
                name: "colorActivated", code: function (color) {
                    if(color==this.var.$state){
                        this.do.changeColor();
                    }
                }
            }
            ]
    }]);