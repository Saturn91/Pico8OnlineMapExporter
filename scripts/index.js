const displayScale = 1;

function submitPico8SourceFile() {
    loadFromFile(fileupload.files[0], (text) => processPico8RawData(text), (error) => console.error(error));
}

let spriteData = undefined;
let dualPurposeGFXData1 = undefined;
let dualPurposeGFXData2 = undefined;
let singlePurposeMapData = undefined;

function processPico8RawData(data) {
    mapDataStartIndex = data.indexOf("__map__") + 8;
    singlePurposeMapData = data.substring(mapDataStartIndex, mapDataStartIndex + 128 * 32 * 2 + 32);

    spriteDataStartIndex = data.indexOf("__gfx__") + 8;
    spriteData = data.substring(spriteDataStartIndex, spriteDataStartIndex + 128 * 32 * 2 + 64);

    dualGFXPurposeStartIndex = spriteDataStartIndex + 128 * 32 * 2 + 64;
    dualPurposeGFXData1 = data.substring(dualGFXPurposeStartIndex, dualGFXPurposeStartIndex + 128 * 32 + 32);
    dualPurposeGFXData2 = data.substring(dualGFXPurposeStartIndex + 128 * 32, dualGFXPurposeStartIndex + 128 * 32 + 128 * 32 + 64);

    drawSpriteDataToCanvas(singlePorpuseSpritesCtx, spriteData, displayScale);
    drawSpriteDataToCanvas(dualPorpuseSpritesCtx1,  dualPurposeGFXData1, displayScale);
    drawSpriteDataToCanvas(dualPorpuseSpritesCtx2,  dualPurposeGFXData2, displayScale);
    previewMapDataBtn.disabled = !spriteData;
}

function fillBackgroundColorsSelect() {
    colorSelect.innerHTML = "";
    PICO_8_COLOR_PALLETE.forEach(col => {
        const option = document.createElement("option");
        option.value = col;
        option.style.backgroundColor = col;
        option.style.color = col;
        colorSelect.appendChild(option);
    });

    updateColorSelectValue();
}

function updateColorSelectValue() {
    colorSelect.style.backgroundColor = colorSelect.value;
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

//define controlls
const previewMapDataBtn = document.getElementById('preview-map-data-btn');
previewMapDataBtn.disabled = true;
previewMapDataBtn.addEventListener('click', () => {
    selectedDualpurpose1 = checkBoxUseDualPurpose1.checked ? dualPurposeGFXData1 : undefined;
    selectedDualpurpose2 = checkBoxUseDualPurpose2.checked ? dualPurposeGFXData2 : undefined;
    drawMap(canvasMapCtx, singlePorpuseSpritesCtx, singlePurposeMapData, selectedDualpurpose1, selectedDualpurpose2, 1, colorSelect.value, useScreenGrid.checked);
});

let selectedDualpurpose1 = undefined;
let selectedDualpurpose2 = undefined;

const checkBoxUseDualPurpose1 = document.getElementById("use_dual_purpose1");
const checkBoxUseDualPurpose2 = document.getElementById("use_dual_purpose2");

const colorSelect = document.getElementById("colors");
fillBackgroundColorsSelect();
colorSelect.addEventListener('change', () => {
    updateColorSelectValue();
});

const useScreenGrid = document.getElementById("use-screen-grid");
