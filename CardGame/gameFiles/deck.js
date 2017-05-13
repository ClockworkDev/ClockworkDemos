CLOCKWORKRT.components.register([
    {
        name: "deck",
        events: [
            {
                name: "#setup", code: function () {
                    this.var.cards = ["AaronGreenberg","ArcadioGarcia"];
                }
            },
            {
                name: "popPlayerDeck", code: function () {
                    this.engine.do.playerDeckCardPopped(this.var.cards.pop());
                }
            },
        ]
    },
    {
        name: "AaronGreenberg",
        inherits: "characterCard",
        vars: [
            { name: "$name", value: "Aaron Greenberg" },
            { name: "$faceSrc", value: "/images/faces/arcadioGarcia.jpg" },
            {
                name: "$stats", value: {
                    productivity: 3,
                    gamerscore: 3,
                    community: 4,
                    sass: 0,
                    events: 4
                }
            },
            { name: "$skill", value: "Mobile first" }
        ]
    },
    {
        name: "ArcadioGarcia",
        inherits: "characterCard",
        vars: [
            { name: "$name", value: "Arcadio Garcia" },
            { name: "$faceSrc", value: "/images/faces/arcadioGarcia.jpg" },
            {
                name: "$stats", value: {
                    productivity: 3,
                    gamerscore: 1,
                    community: 2,
                    sass: 2,
                    events: 1
                }
            },
            { name: "$skill", value: "Mobile first" }
        ]
    }
]);