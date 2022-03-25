const sprites = undefined;

function drawSpriteDataToCanvas(ctx, spriteData, scale) {
    const lines = spriteData.split(/\r?\n/);
    console.log(lines);
    ctx.scale(scale,scale);
    for(let x = 0; x < 16 * 8; x++) {
        for(let y = 0; y < 8 * 8; y++) {
            let picoColor = lines[y][x];
            ctx.fillStyle = PICO_8_COLOR_PALLETE[parseHex(picoColor)];
            ctx.fillRect(x,y,1,1);
        }
    }    
}

function parseHex(str) {
    return Number("0x"+str);
}