function loadFromFile(file, onLoad, onError) {
    if(file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            onLoad(evt.target.result);
        }
        reader.onerror = function (evt) {
            onError();
        }   
    }
}

function loadJSONasDocument() {
    const file = document.getElementById('load-file-input').files[0];
    loadFromFile(file, (fileData) => {
        rectangleManager.loadJSON(fileData);
    }, 
    () => {
        document.getElementById('load-file-input').innerHTML = "error reading file";
    })
}

function loadBackgroundImagefromFile(onload) {
    const file = document.getElementById('backgroundImage-upload').files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function () {
        onload(reader.result);
    }, false);

    if (file) {
        reader.readAsArrayBuffer(file);
    }
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}