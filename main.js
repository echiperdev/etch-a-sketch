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
let cellNum = document.getElementById('cell-counter');
let gen = document.getElementById('generate');
let clear = document.getElementById('clear');
let reset = document.getElementById('reset');
let grid = document.getElementById('grid');
let propsCont = document.getElementById('properties-container');
let propBox = document.querySelector('.properties-box');
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
let pltCustom = document.querySelector('.palettes-custom');
let plt8bit = document.querySelector('.palettes-8-bit');
let plt16bit = document.querySelector('.palettes-16-bit');
let alerts = document.querySelector('.alerts');
let alertMsg = document.getElementById('alert-msg');
let tabletWidth = window.matchMedia('(min-width: 821px)');

// Page load functionality
window.onload = (e) => {
    activeClrCont.style.display = 'none';
    propsCont.style.display = 'none';
    propsModal.style.display = 'none';
    pltCustom.style.display = 'flex';
    mkBtns();
    defaultTool();
    toolSelect();
    initModal();
    showInfo();
    hideInfo();
    initHueGrd();
}

// Store arrays of parent buttons and image sources
let btns = {
    name: [crayon, brush, wand, hard, soft, customPlt, toolProps, info, gen, clear, reset],
    src: ['/img/crayon.svg', '/img/brush.svg', '/img/wand.svg', '/img/hard.svg', '/img/soft.svg', '/img/custom_swatch.svg', '/img/tool_properties.svg', '/img/information.svg', '/img/create.svg', '/img/clear.svg', 'img/reset.svg']
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
    crayon.parentNode.style.outline = '2px solid goldenrod';
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
            activeBtn[i].style.outline = '2px solid goldenrod';
            activeBtn[i].setAttribute('class', 'active');
            for (let j = 0; j < cloneParents.length; j++) {
                cloneParents[j].style.outline = 'none';
                cloneParents[j].setAttribute('class', 'inactive');
            }
        });
        for (let k = 0; k < toolBtns[i].parents.length; k++) {
            toolBtns[i].parents[k].addEventListener('click', () => {
                toolBtns[i].parents[k].appendChild(toolBtns[i].parents[0].removeChild(toolBtns[i].parents[0].firstElementChild));
                toolBtns[i].parents[0].appendChild(toolBtns[i].parents[k].removeChild(toolBtns[i].parents[k].firstElementChild));
                let cloneParents = [...activeBtn];
                cloneParents.splice(i, 1);
                activeBtn[i].style.outline = '2px solid goldenrod';
                activeBtn[i].setAttribute('class', 'active');
                for (let l = 0; l < cloneParents.length; l++) {
                    cloneParents[l].style.outline = 'none';
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
    activeClr.addEventListener('click', () => {
        if (activeClrCont.style.display !== 'none') {
            activeClrCont.style.display = 'none';
            propsCont.appendChild(propBox.parentNode.removeChild(propBox));
        } else {
            activeClrCont.appendChild(propsCont.removeChild(propBox));
            activeClrCont.style.display = 'inline-block';
            activeClrCont.style.marginTop = '1rem';
            activeClrCont.style.right = '-190px';
        }
    });
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
}