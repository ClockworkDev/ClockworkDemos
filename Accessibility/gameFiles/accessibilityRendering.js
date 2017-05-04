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

CLOCKWORKRT.rendering.register("highContrast", highContrast);
if (window.matchMedia("(-ms-high-contrast: active)").matches) {
    CLOCKWORKRT.rendering.setPipeline(["highContrast", "spritesheet"]);
} else {
    CLOCKWORKRT.rendering.setPipeline(["spritesheet"]);
}