var highContrast = (function () {
    var library = null;
    var log;
    return {
        setUp: function (canvas, nfps) {
            return library.setUp(canvas, nfps);
        },
        pauseAll: function () {
            return library.pauseAll();
        },
        restart: function () {
            return library.restart();
        },
        setCamera: function (x, y, z) {
            return library.setCamera(x, y, z);
        },
        getCamera: function () {
            return library.getCamera();
        },
        moveCameraX: function (x) {
            return library.moveCameraX(x);
        },
        moveCameraY: function (y) {
            return library.moveCameraY(y);
        },
        moveCameraZ: function (z) {
            return library.moveCameraZ(z);
        },
        loadSpritesheetJSONObject: function (newspritesheets) {
            return library.loadSpritesheetJSONObject(newspritesheets);
        },
        addObject: function (spritesheet, state, x, y, z, isstatic) {
            return library.addObject(spritesheet, state + "-highContrast", x, y, z, isstatic);
        },
        deleteObject: function (id) {
            return library.deleteObject();
        },
        clear: function () {
            return library.clear();
        },
        pause: function (id) {
            return library.pause();
        },
        unpause: function (id) {
            return library.unpause();
        },
        setX: function (id, x) {
            return library.setX(id, x);
        },
        setY: function (id, y) {
            return library.setY(id, y);
        },
        setZ: function (id, z) {
            return library.setZ(id, z);
        },
        setParameter: function (id, key, value) {
            return library.setParameter(id, key, value);
        },
        setState: function (id, state) {
            return library.setState(id, state + "-highContrast");
        },
        setSpritesheet: function (id, s) {
            return library.setSpritesheet(id, s);
        },
        sendCommand: function (command, commandArgs) {
            return library.sendCommand(command, commandArgs);
        },
        setObjectTimer: function (id, t) {
            return library.setObjectTimer(id, t);
        },
        getObjectTimer: function (id) {
            return library.getObjectTimer(id);
        },
        setEndedCallback: function (id, callback) {
            return library.setEndedCallback(id, callback);
        },
        setRenderMode: function (mode) {
            return library.setRenderMode(mode);
        },
        setBufferSize: function (w, h) {
            return library.setBufferSize(w, h);
        },
        getContext: function () {
            return library.getContext();
        },
        chainWith: function (renderingLibrary) {
            library = renderingLibrary;
        },
        getSpriteBox: function (spritesheet, state) {
            return library.getSpriteBox(spritesheet, state);
        },
        debug: function (handler) {
            log = handler;
            return library.debug(handler);
        },
        setWorkingFolder: function (folder) {
            return library.setWorkingFolder(folder);
        },
        getWorkingFolder: function () {
            return library.getWorkingFolder();
        }
    };
});

var textToSpeech = (function () {
    var library = null;
    var log = function () { };
    var spritesheets = {};
    var objects = [];
    var speechQueue = [];
    var speaking = false;
    var currentCallback = null;
    var currentId;

    var textModeEnabled=false;

    function say(text, rate, pitch, id) {
        if (speaking) {
            speechQueue.push({
                text: text,
                rate: rate,
                pitch: pitch,
                id: id
            });
        } else {
            speaking = true;
            currentId = id;
            msg.text = text;
            msg.rate = rate || 1.2;
            msg.pitch = pitch || 1;
            speechSynthesis.speak(msg);
            currentCallback = null;
        }
    }

    function addCallback(id, callback) {
        for (var i = speechQueue.length - 1; i >= 0; i--) {
            if (speechQueue[i].id == id) {
                speechQueue[i].callback = callback;
                return true;
            }
        }
        if (currentId == id) {
            currentCallback = callback;
            return true;
        }
        return false;
    }

    var msg = new SpeechSynthesisUtterance();
    msg.text = 'Hello World';
    msg.lang = 'en-US';
    msg.rate = 1;
    msg.onend = function (e) {
        if (currentCallback !== null) {
            currentCallback();
        }
        if (speechQueue.length == 0) {
            speaking = false;
            currentId = -1;
        } else {
            var message = speechQueue.shift();
            msg.text = message.text;
            msg.rate = message.rate || 1.2;
            msg.pitch = message.pitch || 1;
            speechSynthesis.speak(msg);
            currentCallback = message.callback || null;
            currentId = message.id;
        }
    };
    return {
        setUp: function (canvas, nfps) {
            return library.setUp(canvas, nfps);
        },
        pauseAll: function () {
            return library.pauseAll();
        },
        restart: function () {
            return library.restart();
        },
        setCamera: function (x, y, z) {
            return library.setCamera(x, y, z);
        },
        getCamera: function () {
            return library.getCamera();
        },
        moveCameraX: function (x) {
            return library.moveCameraX(x);
        },
        moveCameraY: function (y) {
            return library.moveCameraY(y);
        },
        moveCameraZ: function (z) {
            return library.moveCameraZ(z);
        },
        loadSpritesheetJSONObject: function (newspritesheets) {
            newspritesheets.forEach(function (x) {
                spritesheets[x.name] = x;
            })
            return library.loadSpritesheetJSONObject(newspritesheets.filter(function (sp) {
                return sp.name.indexOf("tts:") !== 0;
            }));
        },
        addObject: function (spritesheet, state, x, y, z, isstatic) {
            var id = library.addObject(spritesheet, state, x, y, z, isstatic);
            objects[id] = {
                spritesheet: spritesheets["tts:" + spritesheet],
                state: state,
                x: x,
                y: y,
                z: z,
                vars: {}
            }
            return id;
        },
        deleteObject: function (id) {
            return library.deleteObject();
        },
        clear: function () {
            return library.clear();
        },
        pause: function (id) {
            return library.pause();
        },
        unpause: function (id) {
            return library.unpause();
        },
        setX: function (id, x) {
            objects[id].x = objects[id];
            return library.setX(id, x);
        },
        setY: function (id, y) {
            objects[id].y = y;
            return library.setY(id, y);
        },
        setZ: function (id, z) {
            objects[id].z = z;
            return library.setZ(id, z);
        },
        setParameter: function (id, key, value) {
            objects[id].vars[key] = value;
            return library.setParameter(id, key, value);
        },
        setState: function (id, state) {
            if (textModeEnabled && objects[id].spritesheet && objects[id].spritesheet.states[state]) {
                var message = objects[id].spritesheet.states[state].text.replace(/\[(.*)\]/g, function (key) {
                    return objects[id].vars[key.slice(1, -1)];
                });
                say(message, objects[id].spritesheet.states[state].rate, objects[id].spritesheet.states[state].pitch, id);
            }
            return library.setState(id, state);
        },
        setSpritesheet: function (id, s) {
            objects[id].spritesheet = spritesheets["tts:" + spritesheet];
            return library.setSpritesheet(id, s);
        },
        sendCommand: function (command, commandArgs) {
            if(command==="enableTextToSpeech"){
                textModeEnabled=true;
                return true;
            }
            return library.sendCommand(command, commandArgs);
        },
        setObjectTimer: function (id, t) {
            return library.setObjectTimer(id, t);
        },
        getObjectTimer: function (id) {
            return library.getObjectTimer(id);
        },
        setEndedCallback: function (id, callback) {
            if (textModeEnabled && addCallback(id, callback)) {
                return;
            } else {
                return library.setEndedCallback(id, callback);
            }
        },
        setRenderMode: function (mode) {
            return library.setRenderMode(mode);
        },
        setBufferSize: function (w, h) {
            return library.setBufferSize(w, h);
        },
        getContext: function () {
            return library.getContext();
        },
        chainWith: function (renderingLibrary) {
            library = renderingLibrary;
        },
        getSpriteBox: function (spritesheet, state) {
            return library.getSpriteBox(spritesheet, state);
        },
        debug: function (handler) {
            log = handler;
            return library.debug(handler);
        },
        setWorkingFolder: function (folder) {
            return library.setWorkingFolder(folder);
        },
        getWorkingFolder: function () {
            return library.getWorkingFolder();
        }
    };
});

CLOCKWORKRT.rendering.register("highContrast", highContrast);
CLOCKWORKRT.rendering.register("textToSpeech", textToSpeech);

if (window.matchMedia("(-ms-high-contrast: active)").matches) {
    CLOCKWORKRT.rendering.setPipeline(["textToSpeech","highContrast", "spritesheet"]);
} else {
    CLOCKWORKRT.rendering.setPipeline(["textToSpeech","spritesheet"]);
}
