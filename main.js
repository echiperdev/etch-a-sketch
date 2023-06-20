// Import responsive elements
let title = document.querySelector('.title');
let clrSlct = document.querySelector('.clr-slct');
let activeClr = document.getElementById('active-clr');
let activeClrCont = document.querySelector('.active-clr-content');
let closeClr = document.querySelector('.hide-clr');
let activeTip = document.getElementById('active-tip');
let crayon = document.getElementById('crayon');
let altTip1 = document.getElementById('alt-tip-1');
let brush = document.getElementById('brush');
let altTip2 = document.getElementById('alt-tip-2');
let wand = document.getElementById('wand');
let activeErs = document.getElementById('active-ers');
let hard = document.getElementById('hard');
let altErs = document.getElementById('alt-ers');
let soft = document.getElementById('soft');
let activePlt = document.getElementById('active-plt');
let customPlt = document.getElementById('custom-plt');
let altPlt1 = document.getElementById('alt-plt-1');
let bit8 = document.getElementById('bit-8');
let altPlt2 = document.getElementById('alt-plt-2');
let bit16 = document.getElementById('bit-16');
let toolProps = document.getElementById('tool-props');
let infoBtn = document.getElementById('info');
let hero = document.querySelector('.hero');
let infoModal = document.getElementById('info-modal');
let propsModal = document.getElementById('props-modal');
let closeInfo = document.querySelector('.hide-info');
let closeModal = document.querySelector('.hide-modal');
let modalBody = document.querySelector('.modal-body');
let cellNum = document.getElementById('cell-number');
let generate = document.getElementById('generate');
let clear = document.getElementById('clear');
let reset = document.getElementById('reset');
let grid = document.getElementById('grid');
let propsCont = document.getElementById('properties-container');
let propBox = document.querySelector('.properties-box');
let colorPickerContainer = document.querySelector('.color-picker-container');
let colorPicker = document.querySelector('.color-picker');
let shadeCnv = document.getElementById('shade-canvas');
let hueCnv = document.getElementById('hue-canvas');
let shadeCtx = shadeCnv.getContext('2d');
let hueCtx = hueCnv.getContext('2d');
let shadePicker = document.getElementById('shade-picker');
let huePicker = document.getElementById('hue-picker');
let huePickerH = document.getElementById('hue-picker-horizontal');
let shadeParent = document.getElementById('shade-parent');
let hueParent = document.getElementById('hue-parent');
let colors = ['red', '#ff0', 'lime', 'cyan', 'blue', '#f0f', 'red'];
let hexCode = document.getElementById('hex-code');
let currentColor = document.getElementById('current-color');
let clrMode = document.getElementById('clr-mode');
let modeSwitch = document.getElementById('mode-switch');
let addSwatch = document.getElementById('add-swatch');
let pltDisplay = document.querySelector('.palette-display');
let pltCustom = document.querySelector('.palettes-custom');
let swatchHouse = document.querySelector('.swatch-house');
let plt8bit = document.querySelector('.palettes-8-bit');
let plt16bit = document.querySelector('.palettes-16-bit');
let alerts = document.querySelector('.alerts');
let alertMsg = document.getElementById('alert-msg');
let tabletWidth = window.matchMedia('(min-width: 821px)');

// Store color mode characteristics
const colorModes = [
    {
        btn: crayon,
        name: 'Solid',
    },
    {
        btn: brush,
        name: 'Watercolor',
    },
    {
        btn: wand,
        name: 'Multicolor',
    },
    {
        btn: hard,
        name: 'Hard',
    },
    {
        btn: soft,
        soft: 'Soft',
    }
];

// Page load functionality
window.onload = (e) => {
    activeClrCont.style.display = 'none';
    propsCont.style.display = 'none';
    propsModal.style.display = 'none';
    pltDisplay.style.display = 'none';
    mkBtns();
    defaultTool();
    toolSelect();
    initModal();
    showInfo();
    hideInfo();
    initHueGrd();
    setSldPos();
    setSldPosH();
    initShadeGrd('#1d58b6');
    hexCode.innerHTML = '#1d58b6';
    currentColor.style.backgroundColor = '#1d58b6';
    activeClr.style.backgroundColor = '#1d58b6';
    dragShade();
    slideHue();
    clickSH();
    genGrid();
    clearGrid();
    resetGrid();
    mkSwatches();
    swapPalettes();
    mkLegPlt();
    switchTools();
}

// Store arrays of parent buttons and image sources
let btns = {
    name: [crayon, brush, wand, hard, soft, customPlt, toolProps, info, generate, clear, reset],
    src: ['/img/crayon.svg', '/img/brush.svg', '/img/wand.svg', '/img/hard.svg', '/img/soft.svg', '/img/custom_swatch.svg', '/img/tool_properties.svg', '/img/information.svg', '/img/create.svg', '/img/clear.svg', '/img/reset.svg']
};

// Populate buttons with icons
function mkBtns() {
    for (let i = 0; i < btns.name.length; i++) {
        let img = document.createElement('img');
        btns.name[i].appendChild(img);
    }
    let btnImgs = Array.prototype.slice.call(document.querySelectorAll('img'));
    for (let j = 0; j < btnImgs.length; j++) {
        btnImgs[j].src = btns.src[j];
        btnImgs[j].setAttribute('width', 24);
    }
}

// Set crayon as default tool
function defaultTool() {
    crayon.parentNode.style.border = '2px solid goldenrod';
    crayon.parentNode.style.borderRadius = '52%';
    clrMode.innerHTML = colorModes[0].name;
}

// Store button parents by category
let toolBtns = [
    {
        parents: [activeTip, altTip1, altTip2]
    },
    {
        parents: [activeErs, altErs]
    },
    {
        parents: [activePlt, altPlt1, altPlt2]
    }
];

// Handle active tool selection
let activeBtn = [activeTip, activeErs, activePlt];
function toolSelect() {
    for (let i = 0; i < toolBtns.length; i++) {
        toolBtns[i].parents[0].firstElementChild.addEventListener('click', () => {
            let cloneParents = [...activeBtn];
            cloneParents.splice(i, 1);
            activeBtn[i].style.border = '2px solid goldenrod';
            activeBtn[i].style.borderRadius = '52%';
            activeBtn[i].setAttribute('class', 'active');
            for (let j = 0; j < cloneParents.length; j++) {
                cloneParents[j].style.border = 'none';
                cloneParents[j].setAttribute('class', 'inactive');
            }
        });
        for (let k = 0; k < toolBtns[i].parents.length; k++) {
            toolBtns[i].parents[k].addEventListener('click', () => {
                toolBtns[i].parents[k].appendChild(toolBtns[i].parents[0].removeChild(toolBtns[i].parents[0].firstElementChild));
                toolBtns[i].parents[0].appendChild(toolBtns[i].parents[k].removeChild(toolBtns[i].parents[k].firstElementChild));
                let cloneParents = [...activeBtn];
                cloneParents.splice(i, 1);
                activeBtn[i].style.border = '2px solid goldenrod';
                activeBtn[i].style.borderRadius = '50%';
                activeBtn[i].setAttribute('class', 'active');
                for (let l = 0; l < cloneParents.length; l++) {
                    cloneParents[l].style.border = 'none';
                    cloneParents[l].setAttribute('class', 'inactive');
                }
            });
        }
    }
}

// Populate properties modal based on device width
function initModal() {
    if (tabletWidth.matches) { // if page is wider than 820px
        toggleProps();
        toggleClr();
    } else { // if page is narrower than 821px
        modalBody.appendChild(propsCont.removeChild(propBox));
        revealModal();
        hideModal();
        title.innerHTML = '<span> E' + '&bull;' + 'A' + '&bull;' + 'S';
        title.style.fontSize = '24px';
        clrSlct.style.display = 'none';
    }
}

// Reveals properties
function toggleProps() {
    toolProps.addEventListener('click', () => {
        if (propsCont.style.display !== 'none') {
            propsCont.style.display = 'none';
        } else {
            propsCont.style.display = 'flex';
        }
    });
}

// Reveals properties modal
function revealModal() {
    toolProps.addEventListener('click', () => {
        if (propsModal.style.display !== 'none') {
            propsModal.style.display = 'none';
            propBox.style.display = 'none';
        } else {
            modalBody.appendChild(hero.removeChild(alerts));
            propsModal.style.display = 'flex';
            propBox.style.display = 'flex';
        }
    })
}

// Hides properties modal
function hideModal() {
    closeModal.addEventListener('click', () => {
        hero.appendChild(modalBody.removeChild(alerts));
        propsModal.style.display = 'none';
        propBox.style.display = 'none';
    });
}

// Reveal information modal
function showInfo() {
    info.addEventListener('click', () => {
        infoModal.style.display = 'flex';
    });
}

// Hide information modal
function hideInfo() {
    closeInfo.addEventListener('click', () => {
        infoModal.style.display = 'none';
    });
}

// Set color selection button behavior
function toggleClr() {
    activeClr.addEventListener('click', swapPickerParents);
}

// Handle swapping color picker parents
function swapPickerParents() {
    if (activeClrCont.style.display !== 'none') {
        activeClrCont.style.display = 'none';
        colorPickerContainer.appendChild(colorPicker.parentNode.removeChild(colorPicker));
        toolProps.style.pointerEvents = 'auto';
    } else {
        activeClrCont.appendChild(colorPickerContainer.removeChild(colorPicker));
        activeClrCont.style.display = 'inline-block';
        activeClrCont.style.marginTop = '1rem';
        activeClrCont.style.right = '-190px';
        toolProps.style.pointerEvents = 'none';
    }
}

// Initialize hue gradient
function initHueGrd() {
    let hueGrd = hueCtx.createLinearGradient(0,0,0,300);
    hueGrd.addColorStop(0, 'red');
    for (let i = 0; i < colors.length; i++) {
        hueGrd.addColorStop(i / (colors.length - 1), colors[i]);
    }
    hueCtx.fillStyle = hueGrd;
    hueCtx.fillRect(0,0,300,300);
}

// Initialize horizontal hue gradient
function initHueGrdH() {
    let hueGrd = hueCtx.createLinearGradient(0,0,300,0);
    for (let i = 0; i < colors.length; i++) {
        hueGrd.addColorStop(i / (colors.length - 1), colors[i]);
    }
    hueCtx.fillStyle = hueGrd;
    hueCtx.fillRect(0,0,300,300);
}

// Handle color conversion
function intToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex (r, g, b) {
    return '#' + intToHex(r) + intToHex(g) + intToHex(b);
}

// Initialize shade gradient
function initShadeGrd(color) {
    let grdH = shadeCtx.createLinearGradient(0,0,shadeCtx.canvas.width,0);
    grdH.addColorStop(0, '#fff');
    grdH.addColorStop(1, color);
    shadeCtx.fillStyle = grdH;
    shadeCtx.fillRect(0, 0, shadeCtx.canvas.width, shadeCtx.canvas.height);
    let grdV = shadeCtx.createLinearGradient(0,0,0,300);
    grdV.addColorStop(0, 'rgba(0,0,0,0)');
    grdV.addColorStop(1, '#000');
    shadeCtx.fillStyle = grdV;
    shadeCtx.fillRect(0, 0, shadeCtx.canvas.width, shadeCtx.canvas.height);
}

// Set shade picker position and color
function setShadePicker() {
    let pkRect = shadePicker.getBoundingClientRect();
    let prRect = shadeParent.getBoundingClientRect();
    let x, y, tmpX, tmpY;
    tmpX = pkRect.x - prRect.x + 8;
    tmpY = pkRect.y - prRect.y + 8;
    if (tmpX == 300) {
        x = tmpX - 1;
    } else {
        x = tmpX;
    };
    if (tmpY == 300) {
        y = tmpY - 1;
    } else {
        y = tmpY;
    }
    let data = shadeCtx.getImageData(x,y,1,1)['data'];
    hexCode.innerText = `${rgbToHex(data[0], data[1], data[2])}`;
    currentColor.style.backgroundColor = `${rgbToHex(data[0], data[1], data[2])}`;
    activeClr.style.backgroundColor = `${rgbToHex(data[0], data[1], data[2])}`;
}

// Set hue sliders positions
function setSldPos() {
    let hueRect = hueParent.getBoundingClientRect();
    let sldRect = huePicker.getBoundingClientRect();
    let x = sldRect.x - hueRect.x + 10;
    let y = sldRect.y - hueRect.y + 10;
    let data = hueCtx.getImageData(x,y,1,1)['data'];
    let rgba = `rgba(${data[0]},${data[1]},${data[2]},${data[3]/255})`;
    initShadeGrd(rgba);
    setShadePicker();
}

function setSldPosH() {
    let hueRect = hueParent.getBoundingClientRect();
    let sldRect = huePickerH.getBoundingClientRect();
    let x = sldRect.x - hueRect.x + 10;
    let y = sldRect.y - hueRect.y + 10;
    let data = hueCtx.getImageData(x, y, 1, 1)['data'];
    let rgba = `rgba(${data[0]},${data[1]},${data[2]},${data[3] / 255})`;
    initShadeGrd(rgba);
    setShadePicker();
}

// Establish shade picker drag behavior
const drag = (e) => {
    let parentRect = shadeParent.getBoundingClientRect(),
        x = e.clientX - parentRect.x,
        y = e.clientY - parentRect.y;
    if (x <= 0 && y <= 0) {
        shadePicker.style.left = '-8px';
        picker.style.top = '-8px';
    } else if (x <= 0 && y >= 300) {
        shadePicker.style.left = '-8px';
        shadePicker.style.top = (300 - 8) + 'px';
    } else if (x >= 300 && y <= 0) {
        shadePicker.style.left = (300 - 8) + 'px';
        shadePicker.style.top = '-8px';
    } else if (x >= 300 && y >= 300) {
        shadePicker.style.left = (300 - 8) + 'px';
        shadePicker.style.top = (300 - 8) + 'px';
    } else if (x >= 0 && x <= 300 && y <= 0) {
        shadePicker.style.left = (x - 8) + 'px';
        shadePicker.style.top = '-8px';
    } else if (x >= 300 && y >= 0 && y <= 300) {
        shadePicker.style.left = (300 - 8) + 'px';
        shadePicker.style.top = (y - 8) + 'px';
    } else if (x >= 0 && x <= 300 && y >= 300) {
        shadePicker.style.left = (x - 8) + 'px';
        shadePicker.style.top = (300 - 8) + 'px';
    } else if (x <= 0 && y >= 0 && y <= 300) {
        shadePicker.style.left = '-8px';
        shadePicker.style.top = (y - 8) + 'px';
    } else {
        shadePicker.style.left = (x - 8) + 'px';
        shadePicker.style.top = (y - 8) + 'px';
    }
    setShadePicker();
}

// Handle shade picker interactions
function dragShade() {
    shadePicker.addEventListener('mousedown', function(e) {
        e.preventDefault();
        window.addEventListener('mousemove', drag);
    });
    window.addEventListener('mouseup', function(e) {
        this.window.removeEventListener('mousemove', drag);
    });
}


// Establish hue slider behavior
const slide = (e) => {
    let hueRect = hueParent.getBoundingClientRect(),
        y = e.clientY - hueRect.y,
        yPos;
    if (y <= 0) {
        huePicker.style.top = '-4px';
        yPos = 0;
    } else if (y >= 300) {
        huePicker.style.top = (300 - 4) + 'px';
        yPos = 299;
    } else {
        huePicker.style.top = (y - 4) + 'px';
        yPos = y;
    }
    let data = hueCtx.getImageData(20, yPos, 1, 1)['data'];
    let rgba = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
    initShadeGrd(rgba);
    setShadePicker();
}

// Handle hue slider interactions
function slideHue() {
    huePicker.addEventListener('mousedown', function(e) {
        e.preventDefault();
        window.addEventListener('mousemove', slide);
    });
    window.addEventListener('mouseup', function(e) {
        window.removeEventListener('mousemove', slide);
    });
}

// Handle shade and hue canvases click events
function clickSH() {
    shadeCnv.addEventListener('click', function(e) {
        let x = e.offsetX - 8;
        let y = e.offsetY - 8;
        shadePicker.style.left = x + 'px';
        shadePicker.style.top = y + 'px';
        setShadePicker();
    });
    hueCnv.addEventListener('click', function(e) {
        let y = e.offsetY - 4;
        huePicker.style.top = y + 'px';
        setSldPos();
    });
}

// Handle horizontal hue slider behavior
const slideH = (e) => {
    let hueRect = hueParent.getBoundingClientRect();
    let left = '' + ((e.clientX - hueRect.x - 3) / 300) * 100 + '%';
    let xPos;
    let tmpLeft = ((e.clientX - hueRect.x - 3) / 300)* 100 + '%';
    if (tmpLeft <= -0.2) {
        huePickerH.style.left = '-0.2%';
        xPos = 0;
    } else if (tmpLeft >= 97) {
        huePickerH.style.left = '97%';
        xPos = 296;
    } else {
        huePickerH.style.left = left;
        xPos = e.clientX - hueRect.x - 3;
    }
    let data = hueCtx.getImageData(xPos, 20, 1, 1)['data'];
    let rgba = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
    initShadeGrd(rgba);
    setShadePicker();
}

// Handle grid cells generation
function genGrid() {
    generate.addEventListener('click', () => {
        let pattern = new RegExp('^[1-9][0-9]?$|^100$');
        let cellCount = Number(cellNum.value);
        if (cellCount !== '') {
            if (pattern.test(cellCount)) {
                let rows = cellCount;
                let columns = rows;
                grid.style.borderRight = 'none';
                grid.style.borderBottom = 'none';
                mkCells(rows, columns);
                alertMsg.innerHTML = `The grid contains ${rows * columns} cells`;
                alertMsg.style.color = 'green';
                cellNum.disabled = true;
                generate.style.pointerEvents = 'none';
            } else {
                alertMsg.innerHTML = 'Please insert a whole number from 1 to 100!';
                alertMsg.style.color = 'red';
            }
        }
    })
}

// Store grid cells
let gridCells = [];

// Create and append grid cells
function mkCells(rows, columns) {
    grid.style.setProperty('--grid-rows', rows);
    grid.style.setProperty('--grid-columns', columns);
    for (let i = 0; i < (rows * columns); i++) {
        let cell = document.createElement('div');
        cell.addEventListener('mouseover', colorCell);
        cell.addEventListener('mousedown', colorCell);
        grid.appendChild(cell).className = 'grid-cell';
        gridCells.push(cell);
    }
}

// Handle grid cell background color reset
function clearGrid() {
    clear.addEventListener('click', () => {
        console.log(gridCells);
        for (let i = 0; i < gridCells.length; i++) {
            gridCells[i].style.backgroundColor = '';
            gridCells[i].style.opacity = '';
        }
    });
}

// Handle grid area reset
function resetGrid() {
    reset.addEventListener('click', () => {
        cellNum.disabled = false;
        cellNum.value = '';
        grid.innerHTML = '';
        grid.style.borderRight = '1px solid #e0e5ec';
        grid.style.borderBottom = '1px solid #e0e5ec';
        generate.style.pointerEvents = 'auto';
        alertMsg.innerHTML = '';
    })
}

// Store swatch colors
let swatches = [];

// Handle custom swatches
function mkSwatches() {
    addSwatch.addEventListener('click', () => {
        let swatch = document.createElement('div');
        swatchHouse.appendChild(swatch).className = 'custom-swatch';
        swatch.addEventListener('click', () => {
            swatchHouse.removeChild(swatch);
            for (let i = 0; i < swatches.length; i++) {
                swatches.splice(i, 1);
            }
        })
        swatch.style.backgroundColor = `${hexCode.innerText}`;
        swatch.style.width = '1rem';
        swatch.style.height = '1rem';
        swatches.push(swatch.style.backgroundColor);
        pltDisplay.style.display = 'flex';
        pltCustom.style.display = 'flex';
    })
}

// Handle palette set switch
function swapPalettes() {
    const btns = [customPlt, bit8, bit16];
    const sets = [pltCustom, plt8bit, plt16bit];
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', () => {
            pltDisplay.style.display = 'flex';
            sets[i].style.display = 'flex';
            let cloneSets = [...sets];
            cloneSets.splice(i, 1);
            for (let j = 0; j < cloneSets.length; j++) {
                cloneSets[j].style.display = 'none';
            }
        });
    }
}

// Handle legacy palette generation
function mkLegPlt() {
    mkContainers();
    mkPlt();
    mkLegSwatches();
}

// Handle custom swatch set container generation generation
function mkContainers() {
    for (let i = 0; i < 8; i++) {
        let cont = document.createElement('div');
        plt8bit.appendChild(cont).className = 'swatch-container';
    }
    for (let j = 0; j < 3; j++) {
        let cont = document.createElement('div');
        plt16bit.appendChild(cont).className = 'swatch-container';
    }
}

// Populate swatch containers with palettes
function mkPlt() {
    const swatchConts = document.querySelectorAll('.swatch-container');
    for (e of swatchConts) {
        for (let i = 0; i < 1; i++) {
            let name = document.createElement('p');
            let plt = document.createElement('div');
            e.appendChild(plt).className = 'palette';
        }
    }
}

// Store legacy swatch properties
let swatchProps = [
    {
        id: 'tltx',
        name: 'Teletext',
        colors: ["#000000", "#0001fb", "#fd0200", "#ff00fc", "#00ff01", "#01ffff", "#fffe00", "#ffffff"]
    },
    {
        id: 'fruitII',
        name: 'Fruit II',
        colors: ["#000000", "#d22beb", "#12bc00", "#2099f4", "#de6808", "#f4f3de"],
    },
    {
        id: 'bic20',
        name: 'BIC-20',
        colors: ["#ffffff", "#772a22", "#772a22", "#a860b6", "#1c8026", "#40318c", "#bfcd75", "#e9b488", "#b86962", "#000000"] 
    },
    {
        id: 'cmd64',
        name: 'Commander 64',
        colors: ["#000000", "#fffffb", "#893932", "#68b5bd", "#903d99", "#55a04b", "#40318c", "#bfcd78", "#8a5529", "#594200", "#b76a60", "#514f50", "#787878", "#8ee191", "#786ac2", "#9f9f9f"]
    },
    {
        id: 'xcspec',
        name: 'XC Specter',
        colors: ["#000000", "#0500c5", "#c20000", "#bb01ba", "#bb01ba", "#02bfc5", "#c4be04", "#bfc2b9", "#000200", "#0200fc", "#fa0300", "#ff00fc", "#00ff00", "#01fffc", "#ffff00", "#ffffff"] 
    },
    {
        id: 'mazsys',
        name: 'MAZ Systems',
        colors: ["#3db94b", "#76d079", "#5455eb", "#7978f8", "#b65e52", "#67dce5", "#dd6459", "#fc8977", "#c9c55a", "#ddd187", "#3da04e", "#b566b5", "#d3c7d5", "#ffffff"]
    },
    {
        id: 'johnno5',
        name: 'Jonson NO5',
        colors: ["#000000", "#fe0100", "#03fe03", "#fffc01", "#0200f9", "#ff00f9", "#02feff", "#fffeff", "#bbbbbb", "#df7575", "#77de75", "#dfdb78", "#7b76da", "#de77ed", "#baffff", "#f2bb06"]
    },
    {
        id: 'sgrcpc',
        name: 'Sugar CPC',
        colors: ["#000000", "#00007f", "#810000", "#7d0080", "#008200", "#f70400", "#00827c", "#7e8003", "#7f7f7d", "#807eff", "#ff8000", "#fd7f80", "#7eff7e", "#7cfffe", "#fffe7f", "#fffffb"]
    },
    {
        id: 'ega',
        name: 'EGA',
        colors: ["#000000", "#580002", "#005602", "#ad0000", "#525700", "#fb0009", "#565455", "#5556a9", "#a85700", "#a95553", "#aa54ad", "#56aa00", "#ff5500", "#abaaa5", "#ffaa59", "#ffffff"]
    },
    {
        id: 'nogasu',
        name: 'Nogasu ST',
        colors: ["#000000", "#480000", "#b60000", "#244800", "#da0000", "#484800", "#484848", "#b64824", "#6d6db6", "#489100", "#b66d48", "#ff4824", "#ff6d48", "#9191b6", "#ffb66d", "#ffdada"]
    },
    {
        id: 'cmdfren',
        name: 'Commander Friend',
        colors: ["#000000", "#331100", "#112200", "#112200", "#333333", "#663311", "#335500", "#dd1111", "#665555", "#aa3322", "#448811", "#666688", "#aa6644", "#ff4422", "#997788", "#779933", "#779999", "#ff6644", "#cc8866", "#cc8866", "#99aaaa", "#88bb77", "#ff9944", "#aacc33", "#bbbbbb", "#ffbb55", "#ffaa88", "#bbddee", "#eecccc", "#ffdd66", "#ffff99", "#ffeedd"]
    }
]

// Create legacy swatches
function mkLegSwatches() {
    const palettes = Array.prototype.slice.call(document.querySelectorAll('.palette'));
    for (let i = 0; i < palettes.length; i++) {
        palettes[i].id = swatchProps[i].id;
        palettes[i].title = swatchProps[i].name;
        palettes[i].addEventListener('click', () => {
            if (swatches.length === 0) {
                palettes[i].classList.add('active');
                palettes[i].style.border = '2px solid goldenrod';
                swatches = Array.from(swatchProps[i].colors);
                alertMsg.innerHTML = 'Clear the custom swatches!'
                alertMsg.style.color = 'red';
                let clones = [...palettes];
                clones.splice(i, 1);
                for (let l = 0; l < clones.length; l++) {
                    clones[l].classList.add('inactive');
                    clones[l].style.border = 'none';
                }
            }
        })
        for (let j = 0; j < swatchProps[i].colors.length; j++) {
            let swatch = document.createElement('div');
            palettes[i].appendChild(swatch).className = 'legacy-swatch';
        }
        let sets = Array.prototype.slice.call(palettes[i].childNodes);
        for (let k = 0; k < sets.length; k++) {
            sets[k].style.backgroundColor = swatchProps[i].colors[k];
            sets[k].title = swatchProps[i].colors[k];
        }
    }
}

// Handle mode change
function switchTools() {
    const tools = [];
    for (let i = 0; i < colorModes.length; i++) {
        tools.push(colorModes[i].btn);
    }
    for (let j = 0; j < tools.length; j++) {
        tools[j].addEventListener('click', () => {
            clrMode.innerHTML = colorModes[j].name;
        })
    }
}

// Handle grid cell coloration
function colorCell(e) {
    if (clrMode.innerHTML === 'Solid') {
        e.target.style.backgroundColor = `${hexCode.innerHTML}`;
        e.target.style.opacity = '1.0';
    } else if (clrMode.innerHTML === 'Watercolor') {
        if (e.target.style.opacity <= 1) {
            e.target.style.opacity = +e.target.style.opacity + 0.2;
            e.target.style.backgroundColor = `${hexCode.innerHTML}`;
        }
    } else if (clrMode.innerHTML === 'Multicolor') {
        alertMsg.style.color = 'green';
        if (!modeSwitch.checked) {
            e.target.style.backgroundColor = `${linearClr()}`;
        } else {
            e.target.style.backgroundColor = `${randomClr()}`;
        }
    } else if (clrMode.innerHTML === 'Hard') {
        e.target.style.backgroundColor = '';
        e.target.style.opacity = '';
    } else {
        let bgClr = e.target.style.backgroundColor;
        let r = bgClr.substring(
            bgClr.indexOf("(") + 1, 
            bgClr.indexOf(",")
        );
        let g = bgClr.substring(
            bgClr.indexOf(" ") + 1,
            bgClr.lastIndexOf(",")
        );
        let b = bgClr.substring(
            bgClr.lastIndexOf(" ") + 1,
            bgClr.lastIndexOf(")")
        );
        console.log(e.target.style.opacity);
        console.log(e.target.style.backgroundColor)
        let hsl = rgbToHsl(r, g, b);
        let l = hsl.pop();
        console.log(l);
        let lum = 0;
        if (e.target.style.backgroundColor != '') {
             if (e.target.style.opacity <= '0.2') {
                lum = 100 - l;
                e.target.style.opacity = '1.0';
            } else if (e.target.style.opacity > '0.2' && e.target.style.opacity <= '0.4') {
                lum += l/2;
                e.target.style.opacity = +e.target.style.opacity + 0.1;
            } else if (e.target.style.opacity > '0.4' && e.target.style.opacity <= '0.6') {
                lum += l/3.5;
                e.target.style.opacity = +e.target.style.opacity + 0.06;
            } else if (e.target.style.opacity > '0.6' && e.target.style.opacity <= '0.8') {
                lum += l/4;
                e.target.style.opacity = +e.target.style.opacity + 0.02;
            } else if (e.target.style.opacity > '0.8') {
                lum += (100 - l) / 5;
                if (lum > 90) {
                    lum = 100 - l;
                }
            }
            e.target.style.backgroundColor = `hsl(${hsl[0]}, ${hsl[1]}%, ${l + lum}%)`;
        }
    }
}

// Convert rgb to HSL
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        dif = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
    if (dif == 0) {
        h = 0;
    } else if (cmax == r) {
        h = ((g - b) / dif) % 6;
    } else if (cmax == g) {
        h = (b - r) / dif + 2;
    } else {
        h = (r - g) / dif + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) {
        h += 360;
    }
    l = (cmax + cmin) / 2;
    s = dif == 0 ? 0 : dif / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    return [h, s, l];
}

// Handle linear coloring
let initial = -1;
function linearClr() {
    while (true) {
        const index = ++initial % swatches.length;
        return swatches[index];
    } 
}

// Handle random coloring
function randomClr() {
    while (true) {
        return swatches[Math.floor(Math.random() * swatches.length)];
    }
}