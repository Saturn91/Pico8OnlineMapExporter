function drawMap(mapCtx, sprites, singlePurposeMapData, dualPurposeGFXData1, dualPurposeGFXData2, scale, backColor) {
    let lines = singlePurposeMapData.split(/\r?\n/);
    mapCtx.scale(scale,scale); 
    for(let x = 0; x < lines[0].length/2; x++) {
        for(let y = 0; y < lines.length-1; y++) {
            const spriteY = parseHex(lines[y][x*2]);
            const spriteX = parseHex(lines[y][x*2+1]);
            if(spriteX || spriteY) mapCtx.drawImage(sprites.canvas, spriteX*8, spriteY*8, 8, 8, x*8, y*8, 8, 8);
            else {
                mapCtx.fillStale = PICO_8_COLOR_PALLETE[0];
                mapCtx.fillRect(x*8,y*8, 8, 8);
            }
        }
    }

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
                    mapCtx.fillStale = PICO_8_COLOR_PALLETE[0];
                    mapCtx.fillRect(x*8,256+y/2*8, 8, 8);
                }
            } else {
                if(spriteX || spriteY) mapCtx.drawImage(sprites.canvas, spriteX*8, spriteY*8, 8, 8, 512+x*8, 256+(y-1)/2*8, 8, 8);
                else {
                    mapCtx.fillStale = PICO_8_COLOR_PALLETE[0];
                    mapCtx.fillRect(512+x*8,256+(y-1)/2*8, 8, 8);
                }
            }            
        }
    }

    lines = dualPurposeGFXData2.split(/\r?\n/);
    mapCtx.scale(scale,scale); 
    for(let x = 0; x < lines[0].length/2; x++) {
        for(let y = 0; y < lines.length-1; y++) {
            const yIsOdd = y%2 == 0;
            const spriteX = parseHex((lines[y][x*2]));
            const spriteY = parseHex(lines[y][x*2+1]);
            if(yIsOdd) {
                if(spriteX || spriteY) mapCtx.drawImage(sprites.canvas, spriteX*8, spriteY*8, 8, 8, x*8, 256+128+y/2*8, 8, 8);
                else {
                    mapCtx.fillStale = PICO_8_COLOR_PALLETE[0];
                    mapCtx.fillRect(x*8,256+128+y/2*8, 8, 8);
                }
            } else {
                if(spriteX || spriteY) mapCtx.drawImage(sprites.canvas, spriteX*8, spriteY*8, 8, 8, 512+x*8, 256+128+(y-1)/2*8, 8, 8);
                else {
                    mapCtx.fillStale = PICO_8_COLOR_PALLETE[0];
                    mapCtx.fillRect(512+x*8,256+128+(y-1)/2*8, 8, 8);
                }
            }            
        }
    }
}