let colors = undefined;

function initColors() {
    colors = [];
    PICO_8_COLOR_PALLETE.forEach((col, index) => colors[index] = col);
}

function parseOnePal(string) {
    const tagList = string.replace("(",",").replace(")",",").split(",");

    const num1 = Number(tagList[1]);    
    if(num1 < 0 || num1 > 15) {
        alert("parameter1 in " + string + " must be [0-15] but is: " + num1);
        return;
    }

    const num2 = Number(tagList[2]);
    if(num2 < 128 || num2 > 143) {
        alert("parameter2 in " + string + " must be [128-133] but is: " + num2);
        return;
    }

    colors[num1] = PICO_8_COLOR_2ND_PALLETE[num2 - 128];
    return true;
}

function parsePalTextInput(code) {
    initColors();
    const lines = code.split(/\r?\n/);
    const codeLines = lines.filter(line => !line.startsWith("//"));
    codeLines.forEach((line, index) => {
        const pattern = /pal\([0-9]{1,3},[0-9]{1,3},1\)/gms;
        const lineWithoutWhiteSpaces = line.replace(/^\s+$/, "");
        if(lineWithoutWhiteSpaces.length > 0) pattern.test(lineWithoutWhiteSpaces) ? parseOnePal(lineWithoutWhiteSpaces) : alert("invalid code in line: " + line);
    });
    fillBackgroundColorsSelect(colors);
    return colors;
}