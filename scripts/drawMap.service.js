function drawMap(mapCtx, sprites, singlePurposeMapData, dualPurposeGFXData1, dualPurposeGFXData2, scale, backColor, drawScreenGrid) {
    let lines = singlePurposeMapData.split(/\r?\n/);
    mapCtx.scale(scale,scale); 

    mapCtx.fillStyle = mapCtx.fillStyle = backColor;
    mapCtx.fillRect(0,0, 16*8*8, 4*16*8);

    for(let x = 0; x < lines[0].length/2; x++) {
        for(let y = 0; y < lines.length-1; y++) {
            const spriteY = parseHex(lines[y][x*2]);
            const spriteX = parseHex(lines[y][x*2+1]);
            if(spriteX || spriteY) mapCtx.drawImage(sprites.canvas, spriteX*8, spriteY*8, 8, 8, x*8, y*8, 8, 8);
        }
    }

    if(dualPurposeGFXData1) {
        lines = dualPurposeGFXData1.split(/\r?\n/);
        mapCtx.scale(scale,scale); 
        for(let x = 0; x < lines[0].length/2; x++) {
            for(let y = 0; y < lines.length-1; y++) {
                const yIsOdd = y%2 == 0;
                const spriteX = parseHex(lines[y][x*2]);
                const spriteY = parseHex(lines[y][x*2+1]);
                if(yIsOdd) {
                    if(spriteX || spriteY) mapCtx.drawImage(sprites.canvas, spriteX*8, spriteY*8, 8, 8, x*8, 256+y/2*8, 8, 8);
                    else {
                        mapCtx.fillStyle = backColor;
                        mapCtx.fillRect(x*8,256+y/2*8, 8, 8);
                    }
                } else {
                    if(spriteX || spriteY) mapCtx.drawImage(sprites.canvas, spriteX*8, spriteY*8, 8, 8, 512+x*8, 256+(y-1)/2*8, 8, 8);
                }            
            }
        }
    }
    
    if(dualPurposeGFXData2) {
        lines = dualPurposeGFXData2.split(/\r?\n/);
        mapCtx.scale(scale,scale); 
        for(let x = 0; x < lines[1].length/2; x++) {
            for(let y = 1; y < lines.length; y++) {
                const yIsOdd = y%2 == 0;
                const spriteX = parseHex((lines[y][x*2]));
                const spriteY = parseHex(lines[y][x*2+1]);
                if(!yIsOdd) {
                    if(spriteX || spriteY) mapCtx.drawImage(sprites.canvas, spriteX*8, spriteY*8, 8, 8, x*8, 380+y/2*8, 8, 8);
                } else {
                    if(spriteX || spriteY) mapCtx.drawImage(sprites.canvas, spriteX*8, spriteY*8, 8, 8, 512+x*8, 256+120+y/2*8, 8, 8);
                }            
            }
        }
    }

    if(drawScreenGrid) {
        mapCtx.lineWidth = "1";
        mapCtx.strokeStyle = PICO_8_COLOR_PALLETE[6];
        if(backColor == PICO_8_COLOR_PALLETE[6]) mapCtx.strokeStyle = PICO_8_COLOR_PALLETE[0];

        for(let x = 0; x < 16; x++) {
            for(let y = 0; y < 8; y++) {
                mapCtx.beginPath();
                mapCtx.rect(x*16*8, y*16*8, 16*8, 16*8);
                mapCtx.stroke();
            }
        }

        
    }
}