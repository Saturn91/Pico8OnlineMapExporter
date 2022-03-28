const sprites = undefined;

function drawSpriteDataToCanvas(ctx, spriteData, scale, colorReplaceData) {
    const lines = spriteData.split(/\r?\n/);
    ctx.clearRect(0, 0, 16*8*8, 16*8*8);    
    ctx.scale(scale,scale);
    for(let x = 0; x < lines[1].length; x++) {
        for(let y = 0; y < lines.length; y++) {
            let picoColor = lines[y][x];
            if(picoColor != 0) {
                ctx.fillStyle = colorReplaceData[parseHex(picoColor)];
                ctx.fillRect(x,y,1,1);
            }            
        }
    }    
}

function parseHex(str) {
    return Number("0x"+str);
}