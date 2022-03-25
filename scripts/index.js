const displayScale = 2;

function submitPico8SourceFile() {
    loadFromFile(fileupload.files[0], (text) => processPico8RawData(text), (error) => console.error(error));
}

function processPico8RawData(data) {
    mapDataStartIndex = data.indexOf("__map__") + 8;
    const singlePurposeMapData = data.substring(mapDataStartIndex, mapDataStartIndex + 128 * 32 * 2 + 32);

    spriteDataStartIndex = data.indexOf("__gfx__") + 8;
    const spriteData = data.substring(spriteDataStartIndex, spriteDataStartIndex + 128 * 32 * 2 + 64);

    dualGFXPurposeStartIndex = spriteDataStartIndex + 128 * 32 * 2 + 64;
    const dualPurposeGFXData = data.substring(dualGFXPurposeStartIndex, dualGFXPurposeStartIndex + 128 * 32 * 2 + 32);
    
    drawSpriteDataToCanvas(singlePorpuseSpritesCtx, spriteData, displayScale);
    console.log(singlePurposeMapData);
    console.log(dualPurposeGFXData);
}

const fileupload = document.getElementById('pico8-source-upload');
fileupload.addEventListener('change', submitPico8SourceFile, false);

const canvasSinglePorpuseSprites = document.getElementById('canvas-sprites-single-porpuse-preview');
const singlePorpuseSpritesCtx = canvasSinglePorpuseSprites.getContext("2d");
canvasSinglePorpuseSprites.width = displayScale * 128;
canvasSinglePorpuseSprites.height = displayScale * 64;
