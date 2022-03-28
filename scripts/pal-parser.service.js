let colors = undefined;

function initColors() {
    colors = [];
    PICO_8_COLOR_PALLETE.forEach((col, index) => colors[index] = col);
}

function parseOnePal(string) {
    const tagList = string.replace("(",",").replace(")",",").split(",");
    const num1 = Number(tagList[1]);
    const num2 = Number(tagList[2]) - 128;
    colors[num1] = PICO_8_COLOR_2ND_PALLETE[num2];
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