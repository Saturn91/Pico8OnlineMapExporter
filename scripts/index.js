const displayScale = 1;

function submitPico8SourceFile() {
    loadFromFile(fileupload.files[0], (text) => processPico8RawData(text), (error) => console.error(error));
}

function processPico8RawData(data) {
    mapDataStartIndex = data.indexOf("__map__") + 8;
    const singlePurposeMapData = data.substring(mapDataStartIndex, mapDataStartIndex + 128 * 32 * 2 + 32);

    spriteDataStartIndex = data.indexOf("__gfx__") + 8;
    const spriteData = data.substring(spriteDataStartIndex, spriteDataStartIndex + 128 * 32 * 2 + 64);

    dualGFXPurposeStartIndex = spriteDataStartIndex + 128 * 32 * 2 + 64;
    const dualPurposeGFXData1 = data.substring(dualGFXPurposeStartIndex, dualGFXPurposeStartIndex + 128 * 32 + 32);
    const dualPurposeGFXData2 = data.substring(dualGFXPurposeStartIndex + 128 * 32, dualGFXPurposeStartIndex + 128 * 32 + 128 * 32 + 32);

    drawSpriteDataToCanvas(singlePorpuseSpritesCtx, spriteData, displayScale);
    drawSpriteDataToCanvas(dualPorpuseSpritesCtx1,  dualPurposeGFXData1, displayScale);
    drawSpriteDataToCanvas(dualPorpuseSpritesCtx2,  dualPurposeGFXData2, displayScale);
    drawMap(canvasMapCtx, singlePorpuseSpritesCtx, singlePurposeMapData, dualPurposeGFXData1, dualPurposeGFXData2, 1);
}

const fileupload = document.getElementById('pico8-source-upload');
fileupload.addEventListener('change', submitPico8SourceFile, false);

//define canvases
const canvasSinglePorpuseSprites = document.getElementById('canvas-sprites-single-porpuse-preview');
const singlePorpuseSpritesCtx = canvasSinglePorpuseSprites.getContext("2d");
canvasSinglePorpuseSprites.width = displayScale * 128;
canvasSinglePorpuseSprites.height = displayScale * 64;

const canvasDualPorpuseSprites1 = document.getElementById('canvas-dual-porpuse-preview1');
const dualPorpuseSpritesCtx1 = canvasDualPorpuseSprites1.getContext("2d");
canvasDualPorpuseSprites1.width = displayScale * 128;
canvasDualPorpuseSprites1.height = displayScale * 32;

const canvasDualPorpuseSprites2 = document.getElementById('canvas-dual-porpuse-preview2');
const dualPorpuseSpritesCtx2 = canvasDualPorpuseSprites2.getContext("2d");
canvasDualPorpuseSprites2.width = displayScale * 128;
canvasDualPorpuseSprites2.height = displayScale * 32;

const canvasMap = document.getElementById('canvas-map');
const canvasMapCtx = canvasMap.getContext("2d");
canvasMap.width = 8*16*8;
canvasMap.height = 4*16*8;
